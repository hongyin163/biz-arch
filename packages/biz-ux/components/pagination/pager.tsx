import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from '../_common/icon';
import { PaginationProps } from './types';

/**
 * @visibleName Pagination 分页组件
 */
class Pagination extends Component<PaginationProps, any> {
    public static displayName = 'Pagination'
    public static propTypes = {
        current: PropTypes.number,
        pageSize: PropTypes.number,
        total: PropTypes.number,
    }
    public lastEnd: number;
    public lastStart: number;
    constructor(props, context) {
        super(props, context);
        const me = this;

        me.lastStart = 1;
        me.lastEnd = me.lastStart + 5;
    }
    public onChange(page) {
        const {
            onChange = () => null,
        } = this.props;
        onChange(page);
    }
    public renderPre() {
        const me = this;
        const {
            current = 1,
        } = me.props;

        const pre: React.ReactElement[] = [];

        const disabled = current <= 1;
        pre.push(
            <li key={'<<'} data-index={'1'} className={`biz-pager_item first ${disabled ? 'disabled' : ''}`}>
                <a data-index={'1'} onClick={me.onChange.bind(me, 1)} >
                    <Icon type="db-arrow-left" />
                </a>
            </li>,
        )
        const currentPage = current - 1;
        pre.push(
            <li key={'<' + (currentPage)} data-index={`${currentPage}`} className={`biz-pager_item pre ${disabled ? 'disabled' : ''}`}>
                <a data-index={`${currentPage}`} onClick={me.onChange.bind(me, currentPage)} >
                    <Icon type="arrow-left" />
                </a>
            </li>,
        )

        return pre;
    }
    public renderNext() {
        const me = this;
        const {
            current = 1, total = 0, pageSize = 20,
        } = me.props;
        const totalPage = Math.ceil(total / pageSize);
        // 后面的导航按钮展示逻辑
        const next: React.ReactElement[] = [];

        const disabled = current >= totalPage;
        const currentPage = current + 1;
        next.push(
            <li key={'>' + (currentPage)} data-index={`${currentPage}`} className={`biz-pager_item next ${disabled ? 'disabled' : ''}`}>
                <a data-index={`${currentPage}`} onClick={me.onChange.bind(me, currentPage)}>
                    <Icon type="arrow-right" />
                </a>
            </li>,
        )

        next.push(
            <li key={'>>'} data-index={`${totalPage}`} className={`biz-pager_item last ${disabled ? 'disabled' : ''}`}>
                <a data-index={`${totalPage}`} onClick={me.onChange.bind(me, totalPage)}>
                    <Icon type="db-arrow-right" />
                </a>
            </li>,
        )
        return next;
    }
    public render() {
        const me = this;
        const {
            current = 1, total = 0, pageSize = 20, className = '', style = {},
        } = me.props;
        const totalPage = Math.ceil(total / pageSize);
        const links: React.ReactElement[] = [];

        // 页数小于5,
        if (totalPage <= 5) {
            for (let i = 1; i <= totalPage; i++) {
                links.push(
                    <li key={i} data-index={i + ''} className={'biz-pager_item ' + (i === current ? 'current' : '')}>
                        <a key={i} data-index={i + ''} onClick={me.onChange.bind(me, i)}>{i}</a>
                    </li>,
                )
            }
            return (
                <ul className="biz-pager">
                    {links}
                </ul>
            )
        }

        // 页数大于5
        let start = current - 2;
        let end = current + 2;

        if (start < 1) {
            end = end + (1 - start);
            start = 1;
        }
        if (end > totalPage) {
            start = start - (end - totalPage)
            end = totalPage;
        }

        for (let i = start; i <= end; i++) {
            links.push(
                <li key={i} data-index={i + ''} className={'biz-pager_item ' + (i === current ? 'current' : '')}>
                    <a data-index={i + ''} onClick={me.onChange.bind(me, i)} >{i}</a>
                </li>,
            )
        }

        if (totalPage > end) {
            links.push(
                <li key="..." className="biz-pager_item">
                    <a >•••</a>
                </li>,
                <li key={totalPage} data-index={totalPage + ''} className={'biz-pager_item ' + (totalPage === current ? 'current' : '')}>
                    <a data-index={totalPage + ''} onClick={me.onChange.bind(me, totalPage)} >{totalPage}</a>
                </li>,
            )
        }

        return (
            <ul className={`biz-pager ${className || ''}`} style={style} >
                {me.renderPre()}
                {links}
                {me.renderNext()}
            </ul>
        )
    }
}

export default Pagination;
