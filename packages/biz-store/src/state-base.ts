import { Map } from 'immutable';
import buildAction from './build-action';
import { IStateBase } from './types';

export default class StateBase implements IStateBase {

    public name: string
    public actions: any;
    private myActions: any;
    constructor(name: string) {
        const me = this;
        me.name = name;
        me.myActions = buildAction({
            name,
            reducers: {
                initState() {
                    const state = me.init();
                    if (Map.isMap(state)) {
                        return state;
                    }
                    return Map(me.init() || {});
                },
                update(state, fieldName, fieldValue) {
                    return state.set(fieldName, fieldValue);
                }
            },
            selectors: {
                select(fieldName) {
                    const state = this.getSelfState();
                    return state.get(fieldName);
                }
            }
        });
    }
    public init() {
        return {};
    };

    public update(fieldName: string, fieldValue: any) {
        return this.myActions.update(fieldName, fieldValue);
    }
    public select(fieldName: string) {
        return this.myActions.select(fieldName);
    }
    public getState() {
        return this.myActions.getState();
    }
    public getSelfState() {
        return this.myActions.getSelfState();
    }
}
