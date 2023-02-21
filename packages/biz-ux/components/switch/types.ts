export interface SwitchProps {
    checked?: boolean,
    defaultChecked?: boolean,
    checkedChildren?: React.ReactNode | string,
    unCheckedChildren?: React.ReactNode | string,
    onChange?: (checked: boolean,event: React.MouseEvent)=>void
}
