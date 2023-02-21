import { IStorage } from './types'

const CACHE = {};

export default class MemoryStorage implements IStorage {
    public surport() {
        return true;
    }
    public get = (key: string) => {
        return CACHE[key];
    }
    public set = (key: string, value: any) => {
        CACHE[key] = value;
        return true;
    }
    public remove = (key: string) => {
        if (typeof CACHE[key] !== 'undefined') {
            delete CACHE[key];
        }
        return true;
    }
}
