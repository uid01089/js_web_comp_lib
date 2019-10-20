import { AbstractReducer } from '../../js_web_comp_lib/AbstractReducer.js';
import { Action } from 'redux';
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