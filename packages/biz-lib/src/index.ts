import { buildApi } from './api';
import http from './http'
import { getStorage } from './storage';
import { setOption } from './options';
import util from './util';

import { IBuildApiResult, ISingleApiOptions } from './types'

const localStore = getStorage('localStorage');

export {
    http,
    buildApi,
    util,
    localStore,
    ISingleApiOptions,
    IBuildApiResult,
    setOption
};
