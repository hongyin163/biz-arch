import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

const logger = createLogger({
    stateTransformer(state) {
        const n = {};
        for (const key in state) {
            if (state.hasOwnProperty(key)) {
                n[key] = state[key].toJS ? state[key].toJS() : {};
            }
        }
        return n;
    },
});

export default function (reducer, initState?: any, middlewares?: any[]) {
    const middleware = middlewares || [];
    
    if (process.env.NODE_ENV !== 'production') {
        middleware.push(logger);
    }

    if (middleware.length > 0) {
        const enhancer = applyMiddleware(...middleware);
        return createStore(reducer, initState, enhancer);
    }
    return createStore(reducer, initState);
}
