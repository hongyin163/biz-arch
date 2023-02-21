import React from 'react';
// import './index.less';
/**
 * @visibleName LoadingPage 页面加载中
 */
export default function Loading({ error, pastDelay = 1 }) {
    if (error) {
        return (
            <div>
                <p>
                    {error.message}
                </p>
                <pre>
                    {error.stack}
                </pre>
            </div>
        );
    } else if (pastDelay) {
        return (
            <div className="loading-page" >
                <div className="loading-page_progress">
                </div>
            </div>
        );
    } else {
        return null;
    }
}
