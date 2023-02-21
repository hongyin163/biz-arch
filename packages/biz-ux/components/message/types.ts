type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

export interface ConfigOptions {
    top?: number;
    duration?: number;
    getContainer?: () => HTMLElement;
    transitionName?: string;
    maxCount?: number;
}

export type ThenableArgument = (_: any) => any;

export interface MessageType {
    // ()?: void;
    // then?: (fill: ThenableArgument, reject: ThenableArgument) => Promise<any>;
    // promise?: Promise<any>;
    then?: (r,j)=>any;
}

export interface ArgsProps {
    content: React.ReactNode;
    duration: number | null;
    type: NoticeType;
    onClose?: () => void;
    icon?: React.ReactNode;
}

type ConfigContent = React.ReactNode | string;
type ConfigDuration = number | (() => void);
export type ConfigOnClose = () => void;

export interface IMessageApi {
    info(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    success(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    error(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    warn(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    warning(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    loading(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    open(args: ArgsProps): MessageType;
    config(options: ConfigOptions): void;
    destroy(): void;
}

export interface IMessageItemProps{
    content: React.ReactNode;
    duration: number | null;
    type: NoticeType;
    onClose?: () => void;
    icon?: React.ReactNode;
}
