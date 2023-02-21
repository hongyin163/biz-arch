import React, { Component } from 'react';
import { Camera, Button } from 'biz-ux/index.js';

export default class Photo extends Component {
    onTake = () => {

    }
    render() {
        const me = this;
        return (
            <div>
                <Camera />
                <Button onClick={me.onTake}>拍照</Button>
            </div>
        )
    }
}
