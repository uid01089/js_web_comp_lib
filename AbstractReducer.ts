import { reduxStoreInstance, ReduxStore } from '../ReduxStore';
import { Action } from 'redux';
import { State } from '../ReduxStore';
import { Util } from './Util';




class AbstractReducer {
    _store: ReduxStore;
    constructor() {
        this._store = reduxStoreInstance;
    }

    reducer(state: State, action: Action): State {
        console.error("reducer not overwritten");
        return state;
    }

    static copyInstance(original) {

        return Util.cloneObject(original);


    }
}

export { AbstractReducer, Action };