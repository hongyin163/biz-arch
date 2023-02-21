import { Component } from 'react';

class TagWarpper extends Component<any> {
    public componentDidMount(){
        setTimeout(()=>{
            // console.log('addEventListener click')
            document.addEventListener('click', this.close);
        },100);
    }
    public componentWillUnmount() {
        // console.log('removeEventListener click')
        document.removeEventListener('click', this.close);
    }
    public close = (e) => {
        const me = this;
        const { onClose = () => null } = me.props;
        onClose(e);
    };
    public render() {
        return this.props.children;
    }
}

export default TagWarpper;
