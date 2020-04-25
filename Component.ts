

/**
 * It is the base class for all web components. 
 * See https://developers.google.com/web/fundamentals/web-components
 * 
 */
abstract class Component extends HTMLElement {

    /**
     * An instance of the element is created or upgraded. Useful for initializing state, 
     * setting up event listeners, or creating a shadow dom. See the spec for restrictions 
     * on what you can do in the constructor.
     */
    constructor() {
        super();

        // To use Shadow DOM in a custom element, call this.attachShadow inside your constructor
        this.attachShadow({ mode: 'open' }).appendChild(this.getTemplateElement().content.cloneNode(true));

    }

    /**
     * Calls getHTML for updating the dom
     *
     * @memberof Component
     */
    update() {

        this.unRegisterCallBack();
        this.shadowRoot.innerHTML = this.getHTML();
        this.registerCallBack();
    }

    /**
     * Called every time the element is inserted into the DOM. Useful for running setup code, 
     * such as fetching resources or rendering. Generally, you should try to delay work until 
     * this time.
     */
    connectedCallback() {
        this.registerCallBack();

    }

    /**
     * Called every time the element is removed from the DOM. Useful for running clean up code.
     */
    disconnectedCallback() {
        this.unRegisterCallBack();
    }

    /**
     * The custom element has been moved into a new document (e.g. someone called document.adoptNode(el)).
     */
    adoptedCallback() {

    }

    private getTemplateElement(): HTMLTemplateElement {
        const template = document.createElement('template');
        template.innerHTML = this.getHTML();
        return template;
    }

    /**
     * Returns the HTML from which a template shall be created
     */
    abstract getHTML(): string;

    /**
     *
     *
     * @memberof Component
     */
    registerCallBack() {

    }

    /**
 *
 *
 * @memberof Component
 */
    unRegisterCallBack() {

    }



    static html(literals: TemplateStringsArray, ...placeholders: string[]): string {
        let result = "";

        // interleave the literals with the placeholders
        for (let i = 0; i < placeholders.length; i++) {
            result += literals[i];
            if ((typeof placeholders[i] !== 'undefined') && (placeholders[i] != null)) {
                result += placeholders[i]
                //.replace(/&/g, '&amp;')
                //.replace(/"/g, '&quot;')
                //.replace(/'/g, '&#39;')
                //.replace(/</g, '&lt;')
                //.replace(/>/g, '&gt;');
            } else {
                result += placeholders[i];
            }
        }

        // add the last literal
        result += literals[literals.length - 1];
        return result;
    }
}
export { Component };
