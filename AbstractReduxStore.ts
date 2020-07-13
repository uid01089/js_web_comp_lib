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

    private reducerDictionary: Map<string, AbstractReducer<STATE>>;
    store: any;


    constructor() {
    }

    private basicReducer(state: STATE, action: Action, reduxStoreInstance: AbstractReduxStore<any>): STATE {
        let runningState = state;

        reduxStoreInstance.reducerDictionary.forEach(reducerClass => {
            runningState = reducerClass.reducer(runningState, action);
        });

        return runningState;
    }

    /**
     * Initialize Reducer Store
     * @param initiateState 
     */
    initReduxStore(initiateState: STATE): void {
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
    registerReducer(reducerInstance: AbstractReducer<any>): void {
        const className = reducerInstance.constructor.name;
        if (!this.reducerDictionary.has(className)) {
            this.reducerDictionary.set(className, reducerInstance);
        }
    }


    /**
     * dispatch action
     * @param action 
     */
    dispatch(action): void {
        this.store.dispatch(action);
    }

    /**
     * Subscribe listeners
     * @param listener 
     */
    subscribe(listener: Function): Function {
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