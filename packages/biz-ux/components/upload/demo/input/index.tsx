import { Button, Icon, Loading, Upload } from 'biz-ux'
import React, { Component } from 'react'

import './index.less';

interface CvUpladExcelState {
    file?: any;
    fileState?: any;
}
export default class CvUpladFile extends Component<any, any> {
    public state: CvUpladExcelState
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            file: null,
        }
    }
    public onUploadStart = () => {
        // this.refs.uploadForm.validate();
    }
    public startUpload = () => {
        const me = this;
        (me.refs.upload as Upload).start();
    }
    public beforeUpload = () => {
        return true;
    }
    public onUploadChange = (info) => {
        const me = this;

        me.setState({
            file: info.file,
            fileState: info.event,
        })
    }
    public renderResult = (fileState) => {
        const {
            status,
            response,
        } = fileState;

        if (response && response.code === 208) {
            return (
                <span className="error">
                    您的账号不具备此操作权限，如有疑问请联系高级管理员。
                </span>
            )
        }

        if (status === 'waiting') {
            return null;
        }
        if (status === 'uploading') {
            return (
                <span>
                    <Loading tip={`上传中…… ${fileState.percent}%`} />
                </span>
            )
        }
        if (status === 'error') {
            return (
                <span className="error">
                    上传失败
                </span>
            )
        }
        if (status === 'success') {
            if (!response) {
                return null;
            }
            const {
                code,
                data,
            } = response;
            if (code === 5) {
                const {
                    success,
                    fail,
                    erfeList = [],
                } = data;

                return (
                    <div className="success">
                        <p>
                            导入成功{success}，导入失败 {fail}
                        </p>
                        <ul>
                            {
                                erfeList && erfeList.map((item) => (
                                    <li>第{item.row}行：姓名：{item.name || '无'}，手机号：{item.mobile || '无'}，<span className="red"> 失败原因：{item.desicribe}</span> </li>
                                ))
                            }
                        </ul>
                    </div>
                )
            } else {
                return (
                    <span className="error">
                        {data}
                    </span>
                )
            }
        }
    }
    public render() {
        const me = this;
        const {
            file,
            fileState = {},
        } = me.state;

        const {
            status,
        } = fileState;

        const disabled = status === 'waiting' || status === 'uploading';
        return (
            <div className="upload-excel_body">
                <div className="upload-excel_title" style={{ marginTop: 0 }}>
                    上传 Excel 简历
                    </div>
                <div className="upload-excel_file">
                    <Upload
                        ref="upload"
                        disabled={disabled}
                        multiple={false}
                        action="/resuResolve/buser/excel"
                        accept=".xls"
                        name="file"
                        onChange={me.onUploadChange}
                        beforeUpload={me.beforeUpload}
                        autoUpload={false}
                    >
                        <Icon type="xls" />
                        <div className={`biz-input ${disabled ? 'disabled' : ''}`}>
                            {file ? file.name : <span className="placeholder">请选择文件</span>}
                        </div>
                        <Button type="minor" disabled={disabled}>选择文件</Button>
                    </Upload>
                    <Button disabled={disabled} onClick={me.startUpload}>开始导入</Button>
                </div>
                <div className="upload-excel_title">
                    导入结果
                    </div>
                <div className="upload-excel_result">
                    {
                        me.renderResult(fileState)
                    }
                </div>
            </div>
        )
    }
}
