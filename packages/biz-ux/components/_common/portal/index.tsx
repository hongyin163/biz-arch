import React from 'react';
import ReactDOM from 'react-dom';

interface IPortalProps {
    getContainer: () => HTMLElement;
    didUpdate?: (props) => void;
}

export default class Portal extends React.Component<IPortalProps, any> {
    public _container: HTMLElement;
    public componentDidMount() {
        this.createContainer();
    }

    public componentDidUpdate(prevProps) {
        const { didUpdate } = this.props;
        if (didUpdate) {
            didUpdate(prevProps);
        }
    }

    public componentWillUnmount() {
        this.removeContainer();
    }

    public createContainer() {
        this._container = this.props.getContainer();
        this.forceUpdate();
    }

    public removeContainer() {
        if (this._container && this._container.parentNode) {
            this._container.parentNode.removeChild(this._container);
        }
    }

    public render() {
        if (this._container) {
            return ReactDOM.createPortal(this.props.children, this._container);
        }
        return null;
    }
}
