import classNames from 'classnames'
import React from 'react';
import ReactDOM from 'react-dom';
import Content from './content';
import Modal from './modal';
import { ModalFuncProps } from './types';

interface ConfirmDialogProps extends ModalFuncProps {
    afterClose?: () => void;
    close: (...args: any[]) => void;
    autoFocusButton?: null | 'ok' | 'cancel';
    children?: null;
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
    const {
        width = 250,
        className,
        children,
        title = '',
        ...rest
    } = props;
    const cls = classNames('biz-modal_confirm', className)
    return (
        <Modal
            title={title}
            visible={true}
            centered={false}
            mask={true}
            width={width}
            className={cls}
            {...rest}
        >
            {children}
        </Modal>
    )
}

export default function confirm(config: ModalFuncProps) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    let currentConfig = {
        onOk: () => {
            destroy();
        },
        ...config,
        close,
        visible: true,
    } as any;

    function destroy(...args: any[]) {
        update({
            visible: false,
        })
        const timer = setTimeout(() => {
            const unmountResult = ReactDOM.unmountComponentAtNode(div);
            if (unmountResult && div.parentNode) {
                div.parentNode.removeChild(div);
            }
            const triggerCancel = args && args.length && args.some(param => param && param.triggerCancel);
            if (config.onCancel && triggerCancel) {
                config.onCancel(...args);
            }
            clearTimeout(timer);
        }, 300)
    }

    function update(newConfig: ModalFuncProps) {
        currentConfig = {
            ...currentConfig,
            ...newConfig,
        };
        render(currentConfig);
    }

    function render(props) {
        const {
            content,
            type,
        } = props;
        ReactDOM.render(
            <ConfirmDialog {...props}>
                <Content type={type} content={content}></Content>
            </ConfirmDialog>,
            div,
        );
    }

    render(currentConfig);

    return {
        destroy,
        update,
    }
}
