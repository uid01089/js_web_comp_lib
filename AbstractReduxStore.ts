import {
    createStore,
    compose,
    applyMiddleware,
    combineReducers,
    Action
} from 'redux';
import thunk from 'redux-thunk';

import { AbstractReducer } from './AbstractReducer';


interface AbstractState {
    action: string
}

class AbstractReduxStore<STATE extends AbstractState>{

    private reducerDictionary: Map<String, AbstractReducer<STATE>>;
    store: any;


    constructor() {
    }

    private basicReducer(state: STATE, action: Action, reduxStoreInstance: AbstractReduxStore<any>): STATE {
        var runningState = state;

        reduxStoreInstance.reducerDictionary.forEach(reducerClass => {
            runningState = reducerClass.reducer(runningState, action);
        });

        return runningState;
    }

    /**
     * Initialize Reducer Store
     * @param initiateState 
     */
    initReduxStore(initiateState: STATE) {
        const self = this;
        this.reducerDictionary = new Map();
        this.store = createStore<STATE, Action, {}, {}>((state: STATE = initiateState, action: Action) => {
            return this.basicReducer(state, action, self)
        },
            applyMiddleware(thunk));
    }

    /**
     * Register reducer
     * @param reducerInstance 
     */
    registerReducer(reducerInstance: AbstractReducer<any>) {
        var className = reducerInstance.constructor.name;
        if (!this.reducerDictionary.has(className)) {
            this.reducerDictionary.set(className, reducerInstance);
        }
    }


    /**
     * dispatch action
     * @param action 
     */
    dispatch(action) {
        this.store.dispatch(action);
    }

    /**
     * Subscribe listeners
     * @param listener 
     */
    subscribe(listener): Function {
        return this.store.subscribe(listener);
    }

    /**
     * Returns the state
     */
    getState(): STATE {
        return this.store.getState();
    }
}

export { AbstractReduxStore, AbstractState };