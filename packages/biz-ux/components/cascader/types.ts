import { IListCascaderProps } from '../list-cascader/types';

export interface ICascaderProps extends IListCascaderProps {
    /**
     * 级联选择组件的值，数组类型
     */
    value?: any[];
    /**
     * 选择改变时触发
     */
    onChange?: (value) => void;
    /**
     * 占位
     */
    placeholder?: string;
    /**
     * 为下拉面板附加的 Style 样式
     */
    panelStyle: React.CSSProperties;
    // loadData?: () => void;
    /**
     * 自定义下拉面板挂载容器
     */
    getPopupContainer?: (node: Element) => HTMLElement;
    /**
     * 附加的 CSS Class
     */
    className?: string;
    /**
     * 点击确定选择后触发
     */
    onConfirm?: () => void;
    /**
     * 自定义选择结果的显示格式，默认 斜杠/ 分隔
     */
    renderValue: (value) => any;
}
