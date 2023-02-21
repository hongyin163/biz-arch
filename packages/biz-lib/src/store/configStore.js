
import { createStore, applyMiddleware } from 'redux';
import { Map } from 'immutable';
import { createLogger } from 'redux-logger';

const logger = createLogger({
    stateTransformer(state) {
        let n = {};
        for (const key in state) {
            n[key] = Map.isMap(state[key]) ? state[key].toJS() : {};
        }
        return n;
    }
});

export default function (reducer, initState) {
    let middleware = null;
    if (process.env.NODE_ENV == 'development') {
        middleware = applyMiddleware(logger);
    }
    if (middleware)
        return createStore(reducer, initState, middleware);
    return createStore(reducer, initState);
}