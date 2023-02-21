import React, { Component } from 'react'
import { ITagsSplitProps } from './types';
/**
 * @visibleName TagsSplit 标签显示
 */
class TagsSplit extends Component<ITagsSplitProps, any>{
    public static displayName = 'TagsSplit'
    public render() {
        const {
            style,
            height = 14,
            padding = 8,
            data = [],
        } = this.props;
        const length = data.length;

        const sty = {
            height: `${height}px`,
            lineHeight: `${height}px`,
            paddingRight: `${padding}px`,
        }
        if (length !== 0) {
            return (
                <div className="tags-split" style={{ ...style }}>
                    {
                        data.map((item, index) => {
                            if (index === 0) {
                                return (
                                    item ? (
                                        <span title={item} style={{ ...sty }}>{item}</span>
                                    ) : ''
                                );
                            } else {
                                return (
                                    item ? (
                                        <span title={item} style={{ paddingLeft: `${padding}px`, ...sty }}>{item}</span>
                                    ) : ''
                                );
                            }
                        })
                    }
                </div>
            );
        }
    }
}

export default TagsSplit;
