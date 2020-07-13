import { ReduxComponent } from '../ReduxComponent';
import { Action } from 'redux';
import { reduxStoreInstance, State } from '../../ReduxStore';
import { CSS } from '../../Css';
import { AbstractReduxStore } from '../AbstractReduxStore';
import { AbstractReducer } from '../AbstractReducer';

class EmptyComponentReducer extends AbstractReducer<State> {
    constructor() {
        super(reduxStoreInstance);
    }
    reducer(state: State, action: Action): State {

        return state;
    }
}

class EmptyElement extends ReduxComponent<State> {

    reducer: EmptyComponentReducer;

    constructor() {
        const reducer = new EmptyComponentReducer();
        super(new EmptyComponentReducer(), reduxStoreInstance);
        this.reducer = reducer;

    }

    /**
     * Called every time the element is inserted into the DOM. Useful for running setup code,
     * such as fetching resources or rendering. Generally, you should try to delay work until
     * this time.
     */
    connectedCallback(): void {
        super.connectedCallback();


    }

    /**
     * Can be used to register call back operations
     *
     * @memberof Component
     */
    registerCallBack(): void {
        super.registerCallBack();

        const exampleElement = this.shadowRoot.getElementById("ExampleElement");
        //exampleElement.addEventListener(

        //this.dispatchEvent(new CustomEvent<FileDialogResult>('valueSelected', { detail: { files: files } }));


    }

    /**
     * Returns the HTML from which a template shall be created
     */
    getHTML(): string {

        return ReduxComponent.html` 
        ${CSS}

        <style>
        </style>
        <div id="ExampleElement"></div>

        `;
    }

    /**
     * This operation is called by Redux
     * @param reduxStore 
     */
    triggeredFromRedux(reduxStore: AbstractReduxStore<State>): void {

        super.triggeredFromRedux(reduxStore);

        // Do needful things as reaction of state change
        // meaning update UI :-)
        switch (reduxStore.getState().action) {
            default:
        }
    }




}
window.customElements.define('empty-element', EmptyElement);

export { EmptyElement };

