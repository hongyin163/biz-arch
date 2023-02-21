import { Spin } from 'antd';
import React from 'react';
import './index.less';

export default function Loading() {
    return (
        <div className="loading-center">
            <Spin />
        </div>
    );
}
