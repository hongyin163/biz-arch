import React, { Component } from 'react';
import SelectList from '../select-list';
const Option = SelectList.Option;

export default class PageSize extends Component<any, any> {
    public onSizeChange = (size) => {
        const me = this;
        const {
            onChange,
        } = me.props;
        // debugger;
        onChange(size);
    }
    public render() {
        const me = this;
        const {
            pageSize = 20,
            pageSizeOptions = ['20', '50', '100'],
        } = me.props;
        return (
            <SelectList className="biz-pagination_size"
                value={pageSize + ''}
                onChange={me.onSizeChange}
                position="up"
                // panelStyle={{
                //     textAlign: "center"
                // }}
            >
                {
                    pageSizeOptions.map((size) => {
                        return (
                            <Option value={size + ''}>
                                {size}条/页
                            </Option>
                        )
                    })
                }

            </SelectList>
        )
    }
}
