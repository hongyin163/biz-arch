import { connect } from 'react-redux';
// import { STORE_KEY } from './constants'


const createConnect = () => {
    return (mapStateToProps, mapDispatchToProps, mergeProps, options = {}) => {
        return connect(mapStateToProps, mapDispatchToProps, mergeProps, {
            // storeKey,
            ...options,
        });
    }
}
export {
    connect,
    createConnect
}
