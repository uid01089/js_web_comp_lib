import { AbstractReducer } from '../../js_web_comp_lib/AbstractReducer.js';
import { Action } from 'redux';
import { State } from '../../ReduxStore';


class RedEmptyComponent extends AbstractReducer {
    constructor() {
        super();
    }
    reducer(state: State, action: Action): State {

        return state;
    }
}

export { RedEmptyComponent };