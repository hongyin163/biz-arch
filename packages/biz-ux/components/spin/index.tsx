import classNames from 'classnames';
import React, { Component } from 'react';

interface SpinerProps {
	type?: string;
	tip?: string | React.ReactNode;
	size?: string;
}

/**
 * @visibleName Spin 加载状态图标
 */
class Spin extends Component<SpinerProps> {
	public static displayName = 'Spin'
	public render() {
		const me = this;
		const {
			tip,
			size = '',
		} = me.props;
		const cls = classNames({
			'biz-spin': true,
			'biz-spin-sm': size === 'small',
			'biz-spin-lg': size === 'large',
		})
		return (
			<div className={cls}>
				<i className="indicator"></i>
				<span className="text">
					{tip}
				</span>
			</div>
		)
	}
}

export default Spin
