import { http } from 'biz-lib'
import classNames from 'classnames'
import React, { Component } from 'react'
import Icon from '../_common/icon'
import Loading from '../loading'
import { IFileState, IUploadFile, IUploadProps, IUploadState, UploadFileStatus } from './types'

/**
 * @visibleName Upload 上传组件
 */
class Upload extends Component<IUploadProps, any> {
    public static defaultProps = {
        autoUpload: true,
        multiple: true,
        type: 'all',
    }
    public displayName = 'Upload'
    public state: IUploadState;
    // 并行数
    public count: number;
    public isRunning: boolean;
    public tasks: IUploadFile[];
    public fileMap = {}
    constructor(props: IUploadProps, context) {
        super(props, context);
        const me = this;
        me.state = {
            fileList: props.fileList || props.defaultFileList || [],
            pendding: [],
            fileState: {},
        };

        me.count = 0;
        me.isRunning = false;
    }
    public componentDidMount() {
        // this.start();
    }
    public componentWillUnmount() {
        // this.stop();
    }
    public reset() {
        (this.refs.file as HTMLInputElement).value = null;
    }
    public getNextFile() {
        const me = this;
        return new Promise((resolve) => {
            const pendding = me.state.pendding;
            if (pendding.length <= 0) {
                return resolve(null);
            }
            const file = pendding.pop();
            me.setState({
                pendding,
            }, () => {
                resolve(file);
            })
        })
    }
    public triggerChange(file?) {
        const me = this;
        const {
            onChange = () => null,
        } = me.props;
        const { fileState, fileList } = me.state;
        let fileInfo = {};
        if (file) {
            fileInfo = {
                file,
                event: fileState[file.uid],
            }
        }
        onChange({
            ...fileInfo,
            fileList,
            fileState,
        });
    }
    public appendPendding(file) {
        const me = this;
        return new Promise((resolve) => {
            const pendding = me.state.pendding;
            pendding.push(file);
            me.setState({
                pendding,
            }, () => {
                resolve();
            })
        })
    }
    public updateFileStatus(file: IUploadFile, percent, status: UploadFileStatus, error?, response?) {
        const me = this;
        return new Promise((resolve) => {
            me.setState((state: IUploadState) => {
                const { fileState } = state;
                state.fileState = Object.assign({}, fileState, {
                    [file.uid]: {
                        status,
                        percent,
                        error,
                        response,
                    },
                });
                return state;
            }, () => {
                me.triggerChange(file);
                resolve();
            });
        })
    }
    public appendFiles(files = []) {
        const me = this;
        if (files.length <= 0) {
            return;
        }
        const {
            action,
        } = me.props;
        me.setState((state: IUploadState) => {
            const { fileList, pendding, fileState } = state;
            const fileArray = Array.from(files).map((file) => {
                return me.buildFile(file, action);
            })
            state.fileList = fileArray.concat(fileList);
            state.pendding = fileArray.concat(pendding);
            const fState = fileArray.reduce((pre, current) => {
                pre[current.uid] = {
                    status: 'waiting',
                    percent: 0,
                    error: '',
                }
                return pre;
            }, {})
            state.fileState = Object.assign({}, fileState, fState)
            return state;
        }, () => {
            me.triggerChange(files[0]);
        });
    }
    // public upload(url, data, { format, onSuccess, onError, onProgress }) {
    //     const me = this;
    //     if (!me.fileMap[url]) {
    //         me.fileMap[url] = 0
    //     }
    //     return new Promise((resolve, reject) => {
    //         const timer = setInterval(() => {
    //             me.fileMap[url] += 10;
    //             onProgress(me.fileMap[url]);
    //             if (me.fileMap[url] >= 100) {
    //                 clearInterval(timer);
    //                 resolve();
    //                 onSuccess();
    //             }
    //         }, 2000);
    //     })

    // }
    public async uploadFile(file: IUploadFile, onProgress, onSuccess, onError) {
        const me = this;
        const {
            name = 'file',
            withCredentials,
            data = {},
            customRequest,
        } = me.props;
        let url;
        const action = file.action;
        if (typeof action === 'function') {
            url = await action(file);
        } else {
            url = action;
        }
        let parmas = data || {};
        if (typeof data === 'function') {
            parmas = data(file);
        }
        const formData = {
            ...parmas,
            [name]: file.originFileObj,
        }
        try {
            if (customRequest) {
                return customRequest({
                    url,
                    data: formData,
                    withCredentials,
                    onSuccess,
                    onError,
                    onProgress(event) {
                        if (event.loaded && event.total) {
                            onProgress((event.loaded * 100 / event.total).toFixed(1));
                        }
                    },
                })
            }
            await http.upload(url, formData, {
                format: 'form-data',
                withCredentials,
                onSuccess,
                onError,
                onProgress(event) {
                    if (event.total && event.total > 0 && event.loaded) {
                        onProgress((event.loaded * 100 / event.total).toFixed(1));
                    }
                },
            });

        } catch (err) {
            onError(err);
        }

    }
    public buildFile(file, action): IUploadFile {
        const {
            lastModified,
            lastModifiedDate,
            name,
            size,
            type,
        } = file;
        return {
            uid: `${Date.now()}_${(Math.random() * 1000).toFixed(0)}`,
            lastModified,
            lastModifiedDate,
            name,
            size,
            type,
            fileName: name,
            originFileObj: file,
            action,
        }
    }
    public loop(cb, duration = 1000) {
        const me = this;
        if (!me.isRunning) {
            return;
        }
        // console.log('tasks', me.state.pendding.length);
        // console.log('count', me.count);
        const timer = setTimeout(() => {
            clearTimeout(timer);
            if (cb) { cb(); }
            me.loop(cb, duration)
        }, duration);
    }
    public async check() {
        const me = this;
        const {
            uploadMax = 5,
        } = me.props;

        if (!me.isRunning) {
            return;
        }

        if (me.count >= uploadMax) {
            return;
        }

        const file = await me.getNextFile();

        if (!file) {
            me.stop();
            return;
        }
        // await me.updateFileStatus(file, 0, 'uploading', '');
        await me.runTask(file);
    }
    public async runTask(file) {
        const me = this;
        await me.updateFileStatus(file, 0, 'uploading', '');
        me.count++;
        me.uploadFile(file, (percent) => {
            console.warn('percent', percent);
            if (percent < 100) {
                me.updateFileStatus(file, percent, 'uploading', '')
            } else if (percent >= 100) {
                me.updateFileStatus(file, percent, 'success', '');
            }
        }, (data) => {
            if (me.count > 0) {
                me.count--;
            }
            console.warn('onSuccess', data);
            me.updateFileStatus(file, 100, 'success', '', data);
        }, (err) => {
            if (me.count > 0) {
                me.count--;
            }
            me.updateFileStatus(file, 0, 'error', err.message);
        });
    }
    public start() {
        const me = this;
        if (me.isRunning) {
            return;
        }
        me.isRunning = true;
        me.loop(async () => {
            await me.check();
        }, 1000)
    }
    public stop() {
        this.isRunning = false;
    }
    public clear = () => {
        const me = this;
        const {
            onChange = () => null,
        } = me.props;
        this.setState({
            fileList: [],
            pendding: [],
            fileState: {},
        }, () => {
            onChange({ file: null, fileList: [], event: null, fileState: {} })
        })
    }
    public onDrop = async (event) => {
        const me = this;
        event.preventDefault();
        const {
            files,
        } = event.dataTransfer;
        const {
            beforeAllUpload = () => true,
            autoUpload,
        } = me.props;
        const canUpload = await beforeAllUpload(files);
        if (!canUpload) {
            return false;
        }
        me.appendFiles(files);
        // 如果自动上传，启动上传
        if (autoUpload) {
            me.start();
        }

    }
    public onDragOver = (event) => {
        event.preventDefault();
        // console.log("onDropOver")
    }
    public onDragEnter = () => {
        // console.log('enter')
    }
    public onDragLeave = () => {
        // console.log('leave')
    }
    public onOpenFileClick = () => {
        const me = this;
        const {
            disabled,
            openFileDialogOnClick = true,
        } = me.props;

        if (disabled || !openFileDialogOnClick) {
            return;
        }

        (me.refs.file as HTMLElement).click();
    }
    public onFileChange = async (e) => {
        const me = this;
        const { files } = e.target;
        const {
            beforeAllUpload = () => true,
            beforeUpload = () => true,
            autoUpload,
        } = me.props;
        const {
            fileList = [],
        } = me.state;

        const canUpload = await beforeAllUpload(files);
        if (!canUpload) {
            return;
        }
        const passFiles = Array.from(files).filter(file => beforeUpload(file as File, fileList));

        me.appendFiles(passFiles);
        me.reset();

        if (autoUpload) {
            me.start();
        }
    }
    public renderFiles = () => {
        const me = this;
        const {
            fileList,
            fileState,
        } = me.state;
        return (
            fileList.map((file) => {
                const info = fileState[file.uid] as IFileState;
                return (
                    <div className="biz-upload_file">
                        <Icon type="file" className="file" />
                        <span className="name">
                            {file.name}
                        </span>
                        {info.status === 'waiting' && (
                            <span className="waiting">
                                待上传
                            </span>
                        )}
                        {info.status === 'uploading' && (
                            <span className="uploading">
                                <Loading tip={`上传中…… ${info.percent}%`} />
                            </span>
                        )}
                        {info.status === 'error' && (
                            <span className="error">
                                <Icon type="error" />{info.error}
                            </span>
                        )}
                        {info.status === 'success' && (
                            <span className="success">
                                <Icon type="success" />上传成功
                        </span>
                        )}
                    </div>
                )
            })
        )
    }
    public render() {
        const me = this;
        const {
            className,
            children,
            multiple = true,
            showUploadList = false,
            accept,
            disabled,
        } = me.props;
        const cls = classNames('biz-upload', className);
        return (
            <div className={cls}>
                <div className="biz-upload_drop"
                    onClick={me.onOpenFileClick}
                    onDrop={me.onDrop}
                    onDragEnter={me.onDragEnter}
                    onDragLeave={me.onDragLeave}
                    onDragOver={me.onDragOver}
                >
                    <input ref="file" type="file" disabled={disabled} accept={accept} multiple={multiple} style={{ display: 'none' }}
                        onChange={me.onFileChange}
                    ></input>
                    {children}
                </div>
                {
                    showUploadList && (
                        <div className="biz-upload_files">
                            {me.renderFiles()}
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Upload;
