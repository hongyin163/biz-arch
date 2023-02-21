import React from 'react';

export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed' | 'waiting';

export interface HttpRequestHeader {
    [key: string]: string;
}

export interface IFileState {
    status: UploadFileStatus;
    percent?: number;
    error?: string;
    response?: any;
    url?: string;
    thumbUrl?: string;
    linkProps?: any;
}

export interface IUploadFile {
    uid: string;
    size: number;
    name: string;
    fileName?: string;
    lastModified?: number;
    lastModifiedDate?: Date;
    originFileObj?: File;
    type: string;
    action?: string | ((file: IUploadFile) => PromiseLike<any>);
}

export interface IUploadChangeParam {
    file?: IUploadFile;
    event?: IFileState
    fileState: {
        [uid: string]: IFileState,
    };
    fileList: IUploadFile[];
}

export interface ShowUploadListInterface {
    showRemoveIcon?: boolean;
    showPreviewIcon?: boolean;
}

export interface UploadLocale {
    uploading?: string;
    removeFile?: string;
    uploadError?: string;
    previewFile?: string;
}

export type UploadType = 'drag' | 'select' | 'all';
export type UploadListType = 'text' | 'picture' | 'picture-card';

export interface IUploadProps {
    /**
     * 上传方式，drag : 拖拽，select：点击弹出选择窗
     */
    type?: UploadType;
    /**
     * 上传数据的字段名
     */
    name?: string;
    /**
     * 默认的文件列表
     */
    defaultFileList?: IUploadFile[];
    /**
     * 文件列表
     */
    fileList?: IUploadFile[];
    /**
     * 上传文件的后端请求URL
     */
    action?: string | ((file: IUploadFile) => PromiseLike<any>);
    /**
     * 是否支持目录
     * @todo
     */
    directory?: boolean;
    /**
     * 上传所属的参数，附加到 FormData
     */
    data?: any | ((file: IUploadFile) => any);
    /**
     * 上传请求附加的 HTTP 头
     */
    headers?: HttpRequestHeader;
    /**
     * 是否显示上传列表
     */
    showUploadList?: boolean | ShowUploadListInterface;
    /**
     * 是否支持多选
     */
    multiple?: boolean;
    /**
     * 上传的文件类型
     * @todo
     */
    accept?: string;
    /**
     * 单个文件上传之前执行，可以用来检测每个文件格式等是否合规
     */
    beforeUpload?: (file: File, FileList: IUploadFile[]) => boolean | PromiseLike<any>;
    /**
     * 所有文件上传之前执行，可以检查上传的参数是否完备
     */
    beforeAllUpload?: (files) => boolean | PromiseLike<any>;
    /**
     * 文件上传状态变化触发 onChange 事件
     */
    onChange?: (info: IUploadChangeParam) => void;
    /**
     * 附加的 CSS Class
     */
    className?: string;
    /**
     * @todo
     */
    onPreview?: (file: IUploadFile) => void;
    /**
     * @todo
     */
    onRemove?: (file: IUploadFile) => void | boolean;
    /**
     * 样式
     */
    style?: React.CSSProperties;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 自定义上传请求
     * @todo
     */
    customRequest?: (option: any) => void;
    /**
     * 是否发送 Cookie
     */
    withCredentials?: boolean;
    /**
     * 点击后是否打开文件选择窗口
     */
    openFileDialogOnClick?: boolean;
    /**
     * 同时上传的最大数
     */
    uploadMax?: number;
    /**
     * 选择文件或者拖拽文件以后是否自动上传
     * 如果不自动上传，需要调用 start 方法开始上传
     */
    autoUpload?: boolean;
}

export interface IUploadState {
    fileList: IUploadFile[];
    // dragState: string;
    fileState: {
        [uid: string]: IFileState,
    },
    pendding: IUploadFile[];
}

export interface IUploadListProps {
    listType?: UploadListType;
    onPreview?: (file: IUploadFile) => void;
    onRemove?: (file: IUploadFile) => void | boolean;
    items?: IUploadFile[];
    progressAttr?: any;
    prefixCls?: string;
    showRemoveIcon?: boolean;
    showPreviewIcon?: boolean;
    locale: UploadLocale;
}
