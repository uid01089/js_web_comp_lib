import { AbstractReduxStore } from './AbstractReduxStore';
import { Action } from 'redux';





class AbstractReducer<STATE> {
    protected store: AbstractReduxStore<STATE>;
    constructor(store: AbstractReduxStore<STATE>) {
        this.store = store;
    }

    reducer(state: STATE, action: Action): STATE {
        console.error("reducer not overwritten");
        return state;
    }


}

export { AbstractReducer, Action };