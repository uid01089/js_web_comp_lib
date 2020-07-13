import { Component } from "./Component";
import { AbstractReducer } from "./AbstractReducer";
import { AbstractReduxStore, AbstractState } from "./AbstractReduxStore"


type ReduxListenerUnsubsribeType = () => void;

/**
 * Component with Redux 
 */
abstract class ReduxComponent<STATE extends AbstractState> extends Component {

    private abstractReducer: AbstractReducer<STATE>;
    reduxListenerUnsubscribe: Function;

    constructor(reducer: AbstractReducer<STATE>, reduxStore: AbstractReduxStore<STATE>) {
        super();

        this.abstractReducer = reducer;

        // Register this operation in the Redux
        reduxStore.registerReducer(reducer);

        // Store operation to de-register
        this.reduxListenerUnsubscribe = reduxStore.subscribe(() => this.triggeredFromRedux(reduxStore));

    }

    /**
     * This operation is called by Redux
     * @param reduxStore 
     */
    triggeredFromRedux(reduxStore: AbstractReduxStore<STATE>): void {

        // If not connected anymore, unsubscribe from store
        if (!this.isConnected) {
            this.reduxListenerUnsubscribe();
        }
    }
}

export { ReduxComponent };