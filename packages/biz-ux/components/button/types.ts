
export type ButtonType = 'primary' | 'minor' | 'danger';// (typeof ButtonTypes)[number];

export interface IBaseButtonProps {
    /**
     * 按钮大小
     */
    size?: 'small' | 'default' | 'large';
    /**
     * 按钮对应的 HTML button 的 type 类型
     */
    htmlType?: 'button' | 'reset' | 'submit';
    /**
     * 按钮类型，primary 主按钮，minor 次按钮，danger 警告按钮
     *
     */
    type?: 'primary' | 'minor' | 'danger';
    /**
     * 为按钮附加的 className
     */
    className?: string;
    /**
     * 按钮内的子节点，可以是文本或者其他组件
     */
    children?: React.ReactNode;
    /**
     * 按钮点击事
     */
    onClick?: (event: React.MouseEvent) => void,
    /**
     * 按钮是否可用
     */
    disabled?: boolean,
    /**
     * 为按钮附加的 style 样式
     */
    style?: React.CSSProperties,
}
