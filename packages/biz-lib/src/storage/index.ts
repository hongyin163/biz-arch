import { isThenable } from '../util'
import LocalStorage from './LocalStorage';
import MemoryStorage from './MemoryStorage';
import SessionStorage from './SessionStorage';
import { IStorage, StorageType } from './types'

const storage = {
    sessionStorage() {
        return new SessionStorage();
    },
    localStorage() {
        return new LocalStorage();
    },
    memoryStorage() {
        return new MemoryStorage();
    },
}

/**
 * 处理缓存内容是Promise的情况
 */
function promiseWarrper(store: IStorage): IStorage {
    const promiseCache = {};
    return {
        surport() {
            return store.surport();
        },
        get(key) {
            if (promiseCache[key]) {
                return promiseCache[key];
            }
            const value = store.get(key);
            return value;
        },
        set(key, value) {
            if (isThenable(value)) {
                promiseCache[key] = value;
                return value.then((val) => {
                    store.set(key, val);
                    delete promiseCache[key];
                    return val;
                });
            }
            const result = store.set(key, value);
            return Promise.resolve(result);
        },
        remove(key) {
            if (promiseCache[key]) {
                delete promiseCache[key];
                return true;
            }
            return store.remove(key);
        },
    }
}

/**
 * 根据对应的类型获取storege实例
 * @param type storage类型
 */
export function getStorage(type: StorageType = 'memoryStorage'): IStorage {
    return promiseWarrper(storage[type]());
}

export function getMemoStorage(){
    return storage.memoryStorage();
}
