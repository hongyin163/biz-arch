type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

export interface MessageListProps {
    className?: string;
    style?: React.CSSProperties;
    transitionName?: string;

}

export interface IMessageItemProps {
    id: string;
    className: string;
    message: React.ReactNode;
    description: React.ReactNode;
    duration: number | null;
    type: NoticeType;
    onClose?: () => void;
    icon?: React.ReactNode;
}
