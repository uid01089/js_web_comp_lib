import { Component } from "./Component";
import { AbstractReducer } from "./AbstractReducer";
import { AbstractReduxStore, AbstractState, ReduxComponentIf } from "./AbstractReduxStore"


type ReduxListenerUnsubsribeType = () => void;

/**
 * Component with Redux 
 */
abstract class ReduxComponent<STATE extends AbstractState> extends Component implements ReduxComponentIf {

    private abstractReducer: AbstractReducer<STATE>;
    reduxStore: AbstractReduxStore<STATE>;



    constructor(reducer: AbstractReducer<STATE>, reduxStore: AbstractReduxStore<STATE>) {
        super();

        this.abstractReducer = reducer;
        this.reduxStore = reduxStore;

        // Register this operation in the Redux
        reduxStore.registerReducer(reducer);

        // Register components
        reduxStore.registerComponent(this);



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

    protected reduxListenerUnsubscribe() {

        // Register this operation in the Redux
        this.reduxStore.deRegisterReducer(this.abstractReducer);

        // Register components
        this.reduxStore.deRegisterComponent(this);

    }
}

export { ReduxComponent };