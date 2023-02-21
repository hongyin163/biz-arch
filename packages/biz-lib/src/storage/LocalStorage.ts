import console from '../console'
import { IStorage } from './types'

export default class SessionStorage implements IStorage {
    public surport() {
        return !!window.localStorage;
    }
    public get = (key) => {
        if (typeof key === 'undefined' || key === '') {
            console.warn('key 不可以为空')
        }
        const value = localStorage.getItem(key);
        try {
            const content = JSON.parse(value);
            return content;
        } catch (error) {
            return value;
        }
    };
    public set = (key: string, value: any) => {
        try {
            let content = value;
            const type = typeof value;
            if (type !== 'undefined') {
                content = JSON.stringify(value);
            }
            localStorage.setItem(key, content);
            return true;
        } catch (error) {
            throw error;
        }
    };
    public remove = (key: string) => {
        localStorage.removeItem(key)
        return true;
    }
}
