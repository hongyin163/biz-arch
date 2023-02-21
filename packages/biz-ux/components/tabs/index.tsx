import React, { Component } from 'react';
import Scroll from '../scroll';
import { TabPaneProps, TabsProps } from './types';

/**
 * @visibleName Tabs 标签页
 */
class Tabs extends Component<TabsProps, any> {
    public static TabPane: typeof TabPane;
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            activeKey: props.activeKey || props.defaultActiveKey,
            scrollLeft: 0,
            scrollTop: 0,
            scrollWidth: 0,
        };

    }
    public componentWillReceiveProps(props) {
        const me = this;
        // const {
        //     onChange = () => null,
        // } = me.props;
        if (props.activeKey) {
            if (me.state.activeKey !== props.activeKey) {
                me.setState({
                    activeKey: props.activeKey,
                });
            }
        }
    }
    public componentDidMount() {
        const me = this;
        me.resetScrollState();
    }
    public resetScrollState() {
        const me = this;
        const list = me.refs.list as HTMLDivElement;
        const tabs = list.querySelectorAll('.biz-tabs_tab ');
        let width = 0;
        [].forEach.call(tabs,(tab)=>{
            width += tab.getBoundingClientRect().width;
        })
        me.setState({
            scrollWidth: width,
        })
    }
    public onTabClick = (activeKey) => {
        const me = this;
        const {
            onChange = () => null,
        } = me.props;
        // console.log('onTabClick');
        me.setState({
            activeKey,
        }, () => {
            onChange(activeKey);
        });
    }
    public getChildArray() {
        const me = this;
        const {
            children,
        } = me.props;
        const list = [];
        React.Children.forEach(children as React.ReactElement[], (child) => {
            list.push(child)
        });
        return list;
    }
    public renderTab(props) {
        if (typeof props.tab === 'string') {
            return (
                <span dangerouslySetInnerHTML={{
                    __html: props.tab,
                }}></span>
            )
        }
        return props.tab;
    }
    public createTab(child, activeKey) {
        const me = this;
        return (
            <div role="tab"
                onClick={me.onTabClick.bind(me, child.key)}
                className={`biz-tabs_tab ${activeKey === child.key ? 'active' : ''}`}
                key={child.key}
            >
                {me.renderTab(child.props)}
                <div className="line"></div>
            </div>
        )
    }
    public renderFixedTab(childs, position: 'left' | 'right' | 'none') {
        const me = this;
        const {
            activeKey,
        } = me.state;
        return childs.filter((child) => {
            if (!child || !child.props) {
                return false;
            }
            if (child.props.fixed === position) {
                return true;
            }
            return false;
        }).map((child) => {
            return me.createTab(child, activeKey)
        })
    }
    public renderTabs(childs) {
        const me = this;
        const {
            activeKey,
        } = me.state;

        return childs.filter((child) => {
            if (!child || !child.props) {
                return false;
            }
            return true;
        }).map((child) => {
            return me.createTab(child, activeKey)
        })
    }

    public onTabScroll = (e) => {
        const me = this;
        // console.log(e.target.scrollLeft)
        me.setState({
            scrollLeft: e.target.scrollLeft,
            scrollTop: e.target.scrollTop,
        });
    }
    public render() {
        const me = this;
        const {
            children,
            className = '',
        } = me.props;
        let {
            activeKey,
            scrollLeft,
            scrollTop,
            scrollWidth,
        } = me.state;
        const childArray = me.getChildArray();

        const tabs: React.ReactElement[] = [];
        const tabPanels: React.ReactElement[] = [];
        React.Children.forEach(children as React.ReactElement[], (child: React.ReactElement) => {
            if (!child || !child.key) {
                return;
            }
            if (!activeKey) {
                activeKey = child.key;
            }

            const props = child.props || {};

            tabs.push(
                <div role="tab"
                    onClick={me.onTabClick.bind(me, child.key)}
                    className={`biz-tabs_tab ${activeKey === child.key ? 'active' : ''}`}
                    key={child.key}
                >
                    {me.renderTab(props)}
                    <div className="line"></div>
                </div>,
            );

            tabPanels.push(
                <div className="biz-tabs_content" key={child.key} style={{
                    display: activeKey === child.key ? 'block' : 'none',
                }}>
                    {props.children}
                </div>,
            );
        });

        return (
            <div className={`biz-tabs ${className}`}>
                <div className="biz-tabs_nav" >
                    <div className="biz-tabs_nav-left">
                        {me.renderFixedTab(childArray, 'left')}
                    </div>
                    <Scroll
                        className="biz-tabs_nav-conent"
                        ref="scroll"
                        mode="horizontal"
                        height="auto"
                        width="auto"
                        indicate={{
                            hidden: true,
                        }}
                        hoverButton={{
                            hidden: false,
                        }}
                        scrollWidth={scrollWidth}
                        onScroll={me.onTabScroll}
                        scrollLeft={scrollLeft}
                        scrollTop={scrollTop}
                    >
                        <div ref="list" className="biz-tabs_nav-list">
                            {me.renderTabs(childArray)}
                        </div>
                    </Scroll>
                    <div className="biz-tabs_nav-right">
                        {me.renderFixedTab(childArray, 'right')}
                    </div>
                </div>
                <div className="biz-tabs_body">
                    {tabPanels}
                </div>
            </div>
        );
    }
}

// tslint:disable-next-line: max-classes-per-file
class TabPane extends Component<TabPaneProps, any> {
    public static defaultProps = {
        fixed: 'none',
    }
    public state = {}
    public render() {
        return (
            <div className="biz-tabs_panel">

            </div>
        );
    }
}

Tabs.TabPane = TabPane;

export default Tabs;
