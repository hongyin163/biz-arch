import classNames from 'classnames';
import React, { Component } from 'react';
import Icon from '../_common/icon';
import { IvCalendarProps } from './types'

// 定义每月多少天
const monthOlypic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 闰年
const monthnormal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const myDate = new Date();

/**
 * @visibleName Calendar 日历组件
 */
class Calendar extends Component<IvCalendarProps, any>{
    public static displayName = 'Calendar'

    constructor(props, context) {
		super(props, context);
		const me = this;
		me.state = {
			myYear: myDate.getFullYear(),
			myMonth: myDate.getMonth(),
			myDay: myDate.getDate(),
			emptyDay: [],
			htmlDay: [],
			afterEmptyDay: [],
		}
    }
    
    public componentDidMount() {
		const me = this;
		const { myYear, myMonth } = me.state;
		me.loadInit(myYear, myMonth);
	}

	public loadInit = (year, month) => {
		const me = this;
		const { onChange } = me.props;
		// 调用refreshDate()函数，日历才会出现
		me.refreshDate(year, month);
		// 日历面板变化触发接口事件
		if( onChange ){
			onChange(year, me.addZero(month + 1));
		}
		
	}

    public addZero(num) {
		return num > 9 ? num : '0' + num;
	}

    // 根据年月获取当月第一天是周几
	public dayStart(month, year) {
		const tmpDate = new Date(year, month, 1);
		return (tmpDate.getDay());
	}

    // 根据年月获取当月最后一天是周几
	public dayEnd(month, year) {
		const me = this;
		const tmpDate = new Date(year, month, me.daysMonth(month, year));
		return (tmpDate.getDay());
	}

	// 根据年份判断某月有多少天(11,2018),表示2018年12月
	public daysMonth(month, year) {
		const tmp1 = year % 4;
		const tmp2 = year % 100;
		const tmp3 = year % 400;
		if ((tmp1 === 0 && tmp2 !== 0) || (tmp3 === 0)) {
			return (monthOlypic[month]); // 闰年
		} else {
			return (monthnormal[month]); // 非闰年
		}
	}

	public refreshDate(myYear, myMonth) {
		const me = this;
		// 计算当月的天数
		const totalDay = me.daysMonth(myMonth, myYear);
		const befoeMonth = (myMonth - 1) === -1 ? 11 : (myMonth - 1);
		const beforTotalDay = me.daysMonth(befoeMonth, myYear);
		const firstDay = me.dayStart(myMonth, myYear);
		const endDay = me.dayEnd(myMonth, myYear);
		const resultEmptyDay = [];
		const resultHtmlDay = [];
		const resultEmptyDayAf = [];

		// 添加每个月前的空白部分
		for (let i = (beforTotalDay - firstDay + 1); i <= beforTotalDay; i++) {
			resultEmptyDay.push({
				day: i,
				date: myYear + '-' + me.addZero(myMonth) + '-' + me.addZero(i),
			});
		}

		// 添加当月日期
		for (let i = 1; i <= totalDay; i++) {
			resultHtmlDay.push({
				date: myYear + '-' + me.addZero(myMonth + 1) + '-' + me.addZero(i),
				day: i,
			});
		}

        // 添加每个月后的空白部分
		for (let i = 1; i <= (6 - endDay); i++) {
			resultEmptyDayAf.push({
				day: i,
			});
		}

		me.setState({
			emptyDay: resultEmptyDay,
			htmlDay: resultHtmlDay,
			afterEmptyDay: resultEmptyDayAf,
		});
	}

	// 月份减
	public pre = (e) => {
		e.preventDefault();
		const me = this;
		const { myMonth, myYear } = me.state;
		const resultMonth = myMonth - 1 < 0 ? 11 : myMonth - 1;
		const resultYear = myMonth - 1 < 0 ? myYear - 1 : myYear;
		me.setState({
			myMonth: resultMonth,
			myYear: resultYear,
		});
		// 刷新数据
		me.loadInit(resultYear, resultMonth);
	}

	// 月份加
	public next = (e) => {
		e.preventDefault();
		const me = this;
		const { myMonth, myYear } = me.state;
		const resultMonth = myMonth + 1 > 11 ? 0 : myMonth + 1;
		const resultYear = myMonth + 1 > 11 ? myYear + 1 : myYear;
		me.setState({
			myMonth: resultMonth,
			myYear: resultYear,
		});
		// 刷新数据
		me.loadInit(resultYear, resultMonth);
    }
    
    public render() {
		const me = this;
		const { dateCellRender } = me.props;
		const { myYear, myMonth, emptyDay, htmlDay, afterEmptyDay } = me.state;

		return (
			<div className="calendar">
				<div className="calendar-title">
					<span className="calendar-title_year">{myYear}年{myMonth + 1}月</span>
					<Icon onClick={me.pre} type="arrow-solid-right" className="calendar-title_icon calendar-title_left" />
					<span className="calendar-title_month">上月 / 下月</span>
					<Icon onClick={me.next} type="arrow-solid-right" className="calendar-title_icon" />
				</div>
				<div className="calendar-body">
					<div className="calendar-body_week">
						<ul>
							<li>周日</li>
							<li>周一</li>
							<li>周二</li>
							<li>周三</li>
							<li>周四</li>
							<li>周五</li>
							<li>周六</li>
						</ul>
					</div>
					<div className="calendar-body_list">
						<ul id="days">
							{
								emptyDay.length > 0 && emptyDay.map(item => {
									return (
										<li className="empty">{item.day}</li>
									)
								})
							}
							{
								htmlDay.length > 0 && htmlDay.map(item => {
									return (
										<li className={item.date === (myDate.getFullYear() + '-' + me.addZero(myDate.getMonth() + 1) + '-' + me.addZero(myDate.getDate())) ? 'active' : ''}>
											<span >{item.day}</span>
											{
												dateCellRender && dateCellRender(item.date)
											}
										</li>
									)
								})
							}
							{
								afterEmptyDay.length > 0 && afterEmptyDay.map(item => {
									return (
										<li className="empty">{item.day}</li>
									)
								})
							}
						</ul>
					</div>
				</div>
			</div>

		);
	}
}

export default Calendar;
