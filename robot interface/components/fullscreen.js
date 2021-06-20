//#region IMPORTS
//#endregion IMPORTS

//#region TEMPLATE
const fullscreen_template = document.createElement('template');
fullscreen_template.innerHTML = /* html */ `
  
    <style>
        button {
            background-color: #ddd;
            border: none;
            color: black;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            margin: 4px 4px;
            cursor: pointer;
            border-radius: 16px;
        }
    </style>

    <button type="button" id="btnFullscreen">Fullscreen</button>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define('fullscreen-ɮ', class extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(fullscreen_template.content.cloneNode(true));
        this.$fullscreen = this._shadowRoot.querySelector('#btnFullscreen');
    }

    static get observedAttributes() {
        return ['kenny'];
    }

    set content(x) {
        this.$content.innerHTML = x;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'kenny':
                break;
        }
    }

    connectedCallback() {
        this.$fullscreen.addEventListener('click', this.handler.bind(this));
    }

    handler(e) {
        //console.log(e);
        this.dispatchEvent(new CustomEvent('fullscreen', {
            bubbles: true,
            composed: true,
            detail: e.target
        }));
    }
});
//#endregion CLASS