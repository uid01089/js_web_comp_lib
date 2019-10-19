import {
    createStore,
    compose,
    applyMiddleware,
    combineReducers,
    Action
} from 'redux';
import thunk from 'redux-thunk';

import { AbstractReducer } from './AbstractReducer';


class AbstractReduxStore<State>{

    _reducers: Map<String, AbstractReducer>;
    store: any;


    constructor() {
    }

    _coreReducer(state: State, action: Action, reduxStoreInstance): State {
        var runningState = state;

        reduxStoreInstance._reducers.forEach(reducerClass => {
            runningState = reducerClass.reducer(runningState, action);
        });

        return runningState;
    }

    initReduxStore(initiateState: State) {
        const self = this;
        this._reducers = new Map();
        this.store = createStore<State, Action, {}, {}>((state: State = initiateState, action: Action) => {
            return this._coreReducer(state, action, self)
        },
            applyMiddleware(thunk));
    }

    registerReducer(reducerInstance: AbstractReducer) {
        var className = reducerInstance.constructor.name;
        if (!this._reducers.has(className)) {
            this._reducers.set(className, reducerInstance);
        }
    }


    dispatch(action) {
        this.store.dispatch(action);
    }

    subscribe(listener): Function {
        return this.store.subscribe(listener);
    }
    getState(): State {
        return this.store.getState();
    }
}

export { AbstractReduxStore };