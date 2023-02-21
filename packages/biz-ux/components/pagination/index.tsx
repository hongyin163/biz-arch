import React, { Component } from 'react';
import PageGo from './page-go';
import PageSize from './page-size';
import Pager from './pager';
import { PaginationProps } from './types';

/**
 * @visibleName Pagination 分页组件
 */
class Pagination extends Component<PaginationProps, any> {
    public static displayName = 'Pagination'
    public static defaultProps: PaginationProps = {
        showSizeChanger: false,
        showQuickJumper: false,
        pageSize: 20,
    }
    constructor(props, context) {
        super(props, context);
    }
    public onPageChange = (page) => {
        const {
            onChange = () => null,
            pageSize,
        } = this.props;
        onChange(page, Number(pageSize));
    }
    public onPageSizeChange = (size) => {
        const {
            onChange = () => null,
        } = this.props;
        onChange(1, Number(size));
    }
    public renderTotal = () => {
        const me = this;
        const {
            total,
            showTotal,
        } = me.props;
        if (showTotal) {
            return showTotal(total, [0, 0]);
        }
        return (
            <div className="biz-pagination_total">
                共 <span className="biz-pagination_num">{total}</span> 条数据
            </div>
        )
    }
    public render() {
        const me = this;
        const {
            current,
            pageSize,
            total,
            showSizeChanger = false,
            showQuickJumper = false,
            pageSizeOptions,
        } = me.props;
        return (
            <div className="biz-pagination">
                {
                    me.renderTotal()
                }
                <Pager current={current} pageSize={pageSize} total={total} onChange={me.onPageChange} />
                {
                    showSizeChanger && (
                        <PageSize pageSize={pageSize} pageSizeOptions={pageSizeOptions} onChange={me.onPageSizeChange} />
                    )
                }
                {
                    showQuickJumper && (
                        <PageGo current={current} pageSize={pageSize} total={total} onChange={me.onPageChange} />
                    )
                }
            </div>
        )
    }
}

export default Pagination;
