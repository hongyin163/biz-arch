import React from 'react';
import ReactDOM from 'react-dom';

interface IPortalProps {
    getContainer: () => HTMLElement;
    didUpdate?: (props) => void;
}

export default class Portal extends React.Component<IPortalProps, any> {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            visible: false,
        }
    }
    public _container: HTMLElement;
    public componentDidMount() {
        const me = this;
        me.createContainer();
        me.forceUpdate(() => {
            setTimeout(()=>{

                me.setState({ visible: true })
            },2000)
        });
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
    }

    public removeContainer() {
        if (this._container) {
            this._container.parentNode.removeChild(this._container);
        }
    }

    public render() {
        const me = this;
        const {
            children
        } = me.props;
        const {
            visible,
        } = me.state;
        if (me._container) {
        return ReactDOM.createPortal((<div>{visible ? children : null}</div>), this._container);
        }
        return null;
    }
}
