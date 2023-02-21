// tslint:disable: no-console

import { Button, Modal, Upload } from 'biz-ux'
import React, { Component } from 'react'
import './index.less';

export default class UploadDrag extends Component<any,any> {
    public componentDidMount() {
        // this.loadChannels();
    }
    public onUploadChange(info) {
        console.log(info.fileList);
        console.log(info.fileState)
    }
    public buildParams() {
        return {
            id:'xx',
        }
    }
    public beforeUpload = (file: any, fileList: any) => {
        // e.preventDefault();
        // e.stopPropagation();
        const me = this;
        const {
            beforeUpload = () => true,
        } = me.props

        return beforeUpload(file, fileList);
    }
    public onBeforeAllUpload(files) {
        if (files.length > 5) {
            Modal.warning({
                title: '提醒',
                content: '一次上传文件不能超过5份',
            });
            return false;
        }
        return true;
    }
    public render() {
        const me = this;
        return (
            <div className="upload-demo">
                <Upload uploadMax={5}
                    action="/api/upload/file/"
                    accept=".doc,.docx,.txt,.html,.mht,.mhtml,.pdf,.png,.jpg,.jpeg"
                    data={me.buildParams()}
                    onChange={me.onUploadChange}
                    beforeUpload={me.beforeUpload}
                    beforeAllUpload={me.onBeforeAllUpload}
                >
                    <p className="desc">将文件拖入这里或</p>
                    <Button>上传本地文件</Button>
                    <p className="desc">支持pdf、doc、docx、html、mht、mhtml、txt、jpg、jpeg、png格式的文件</p>
                    <p className="desc warn">每份文件不超过10M，每次上传数量不超过5份</p>
                </Upload>
            </div>
        )
    }
}
