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

export default function (reducer, initState?: any) {
    let middleware = null;
    if (process.env.NODE_ENV !== 'production') {
        middleware = applyMiddleware(logger);
    }
    if (middleware) {
        return createStore(reducer, initState, middleware);
    }
    return createStore(reducer, initState);
}
