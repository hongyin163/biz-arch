import { Provider as _provider } from 'react-redux';
// import { STORE_KEY } from './constants';

/**
 * 自定义的Provider，在context内注册名称为_store的store对象
 */
export const Provider = _provider;

/**
 * 
 * @param storeKey 
 */
export const createProvider = (storeKey: string) => {
    return Provider;
}
