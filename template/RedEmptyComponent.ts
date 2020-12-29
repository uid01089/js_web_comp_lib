import { AbstractReducer, Action } from '../../js_web_comp_lib/AbstractReducer.js';
import { reduxStoreInstance, State } from '../../ReduxStore';




class RedEmptyComponent extends AbstractReducer<State> {
    constructor() {
        super(reduxStoreInstance);
    }
    reducer(state: State, action: Action): State {

        return state;
    }
}

export { RedEmptyComponent };