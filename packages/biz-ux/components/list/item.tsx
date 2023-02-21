import { Component } from 'react'
import {ItemProps} from './types'
export default class Item extends Component<ItemProps,any> {
    public render() { 
        return this.props.children;
    }
}
