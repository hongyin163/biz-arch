
export const STORAGE_TYPE = {
    'sessionStorage': 'sessionStorage',
    'localStorage': 'localStorage',
    'memoryStorage': 'memoryStorage',
}

export type StorageType = 'sessionStorage' | 'localStorage' | 'memoryStorage'

export interface IStorage {
    surport: () => boolean;
    get: (key: string) => any;
    set: (key: string, value: any) => boolean;
    remove: (key: string) => boolean;
}
