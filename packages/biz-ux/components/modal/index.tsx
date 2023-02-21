
export { ModalProps, ModalFuncProps } from './types'
import confirm from './confirm';

import Modal from './modal';

import { ModalFuncProps } from './types';

Modal.confirm = (props: ModalFuncProps) => {
    const config = {
        type: 'confirm',
        okCancel: true,
        centered: true,
        ...props,
    };
    return confirm(config);
};

Modal.error = (props: ModalFuncProps) => {
    const config = {
        type: 'error',
        centered:true,
        okCancel: true,
        closable: false,
        cancelText:'',
        okText: '确定',
        ...props,
    };
    return confirm(config);
};

Modal.info = (props: ModalFuncProps) => {
    const config = {
        type: 'info',
        centered:true,
        okCancel: true,
        closable: false,
        cancelText:'',
        okText: '确定',
        ...props,
    };
    return confirm(config);
};

Modal.success = (props: ModalFuncProps) => {
    const config = {
        centered:true,
        type: 'success',
        okCancel: true,
        closable: false,
        cancelText:'',
        okText: '确定',
        ...props,
    };
    return confirm(config);
};

Modal.warning = (props: ModalFuncProps) => {
    const config = {
        type: 'warn',
        okCancel: true,
        centered:true,
        closable: false,
        okText: '确定',
        cancelText: '',
        onOk() {
            win.destroy();
        },
        ...props,
    };
    const win = confirm(config);
    return win;
};

/**
 * @visibleName Modal 模态窗
 */
export default Modal;

export {
    Modal,
}
