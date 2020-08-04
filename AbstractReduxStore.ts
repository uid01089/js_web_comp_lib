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

abstract class AbstractReduxStore<STATE extends AbstractState>{

    private reducerDictionary: Map<string, AbstractReducer<STATE>>;
    store: any;


    constructor() {
        // Do nothing
    }

    private basicReducer(state: STATE, action: Action, reduxStoreInstance: AbstractReduxStore<any>): STATE {
        let runningState = state;

        reduxStoreInstance.reducerDictionary.forEach(reducerClass => {
            runningState = reducerClass.reducer(runningState, action);
        });

        this.finalReducer(runningState, action);

        return runningState;
    }

    /**
     * finalReducer have to be implemented by the refined Class. 
     * It is the last reducer which is called.
     * Within this operation save operation can be performed
     *
     * @abstract
     * @param {STATE} state
     * @param {Action<any>} action
     * @memberof AbstractReduxStore
     */
    abstract finalReducer(state: STATE, action: Action<any>): void;


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