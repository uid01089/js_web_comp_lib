

import { AbstractReducer, Action } from './AbstractReducer';
import { Util } from './Util';
import { reduxStoreInstance } from '../ReduxStore';


interface AbstractState {
    action: string
}

interface ReduxComponentIf {
    triggeredFromRedux(reduxStore: AbstractReduxStore<any>): void;
}

type DispatchFct = (action: Action) => void;
type TriggerFct = (dispatchFct: DispatchFct) => Promise<void>;

abstract class AbstractReduxStore<STATE extends AbstractState>{


    private reducerDictionary: Set<AbstractReducer<STATE>>;
    private componentDictionary: Set<ReduxComponentIf>;
    private state: STATE;



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
        this.state = Util.cloneObject(initiateState);
        this.reducerDictionary = new Set();
        this.componentDictionary = new Set();

    }

    /**
     * Register reducer
     * @param reducerInstance 
     */
    registerReducer(reducerInstance: AbstractReducer<STATE>): void {
        this.reducerDictionary.add(reducerInstance);
    }

    registerComponent(reduxComponent: ReduxComponentIf): void {
        this.componentDictionary.add(reduxComponent);
    }

    deRegisterComponent(reduxComponent: ReduxComponentIf): void {
        this.componentDictionary.delete(reduxComponent);
    }
    deRegisterReducer(reducerInstance: AbstractReducer<STATE>): void {
        this.reducerDictionary.delete(reducerInstance);
    }


    dispatchAction(action: Action): void {
        const actionFct = async (dispatch) => {
            dispatch(action);
        }
        this.dispatch(actionFct);
    }


    async dispatch(triggerFct: TriggerFct): Promise<void> {
        await triggerFct((action) => {

            // Trigger all Reducers, state is modified
            this.reducerDictionary.forEach(reducerClass => {
                this.state = reducerClass.reducer(this.state, action);
            });

            // Trigger final Reducer, for example serve persistence
            this.finalReducer(this.state, action);

            this.componentDictionary.forEach(componentClass => {
                componentClass.triggeredFromRedux(this);
            });

        });


    }





    /**
     * Returns the state
     */
    getState(): STATE {
        return this.state;
    }
}

export { AbstractReduxStore, AbstractState, ReduxComponentIf, DispatchFct, TriggerFct };

