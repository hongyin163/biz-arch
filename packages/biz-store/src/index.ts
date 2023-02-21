import createAction from './build-action';
import configStore from './config-store';
import { connect, createConnect } from './connect';
import { Provider, createProvider } from './provider';
import StateBase from './state-base';
import { useSelector, useStore, useDispatch, createDispatchHook, createSelectorHook } from 'react-redux'
import store from './store';

export default store;

export {
    Provider,
    createProvider,
    connect,
    createConnect,
    createAction,
    configStore,
    StateBase,

    useDispatch,
    createDispatchHook,
    useSelector,
    createSelectorHook,
    useStore,
}
