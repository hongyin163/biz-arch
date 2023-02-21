import configStore from './config-store';
/**
 * 最好针对不同的业务划分store，不用把所有的业务写在一个store里
 */
const Store = configStore((state) => state);

export default Store;
