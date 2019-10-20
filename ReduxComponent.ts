import { Component } from "./Component";
import { AbstractReducer } from "./AbstractReducer";
import { AbstractReduxStore } from "./AbstractReduxStore"

/**
 * Component with Redux 
 */
abstract class ReduxComponent<STATE> extends Component {

    reducer: AbstractReducer<STATE>;
    reduxListenerUnsubscribe: Function;

    constructor(reducer: AbstractReducer<STATE>, reduxStore: AbstractReduxStore<STATE>) {
        super();

        this.reducer = reducer;

        // Register this operation in the Redux
        reduxStore.registerReducer(reducer);

        // Store operation to de-register
        this.reduxListenerUnsubscribe = reduxStore.subscribe(() => this.triggeredFromRedux(reduxStore));

    }

    /**
     * This operation is called by Redux
     * @param reduxStore 
     */
    triggeredFromRedux(reduxStore: AbstractReduxStore<STATE>) {

        // If not connected anymore, unsubscribe from store
        if (!this.isConnected) {
            this.reduxListenerUnsubscribe();
        }
    }
}

export { ReduxComponent };