type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';
export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface ConfigProps {
    top?: number;
    bottom?: number;
    duration?: number;
    placement?: NotificationPlacement;
    getContainer?: () => HTMLElement;
    className?: string;
     /**
     * 隐藏箭头
     */
    hideArrow?: boolean;
}

export interface IArgsProps {
    message: React.ReactNode;
    description?: React.ReactNode;
    key?: string;
    onClose?: () => void;
    duration?: number | null;
    icon?: React.ReactNode;
    placement?: NotificationPlacement;
    style?: React.CSSProperties;
    className?: string;
    readonly type?: NoticeType;
    onClick?: () => void;
    /**
     * 隐藏箭头
     */
    hideArrow?: boolean;
}

export type ConfigOnClose = () => void;

export interface INotificationApi {
    success(args: IArgsProps): void;
    error(args: IArgsProps): void;
    info(args: IArgsProps): void;
    warn(args: IArgsProps): void;
    warning(args: IArgsProps): void;
    open(args: IArgsProps): void;
    close(key: string): void;
    config(options: ConfigProps): void;
    destroy(): void;
}
