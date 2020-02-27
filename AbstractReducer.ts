import { AbstractReduxStore, AbstractState } from './AbstractReduxStore';
import { Action } from 'redux';





class AbstractReducer<STATE extends AbstractState> {
    protected store: AbstractReduxStore<STATE>;
    constructor(store: AbstractReduxStore<STATE>) {
        this.store = store;
    }

    reducer(state: STATE, action: Action): STATE {
        state.action = action.type;
        return state;
    }


}

export { AbstractReducer, Action };