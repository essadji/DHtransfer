//#region IMPORTS
//#endregion IMPORTS

//#region TEMPLATE
const modal_template = document.createElement('template');
modal_template.innerHTML = /* html */ `
<style>
    /* Modal Header */
    p {
        font-size: 40pt;
        font-family: 'Open Sans', sans-serif;
        text-align: center;
    }
    .modal-header {
        padding: 2px 16px;
        background-color: var(--ucll-red);
        color: white;
        border-radius: 25px 25px 0 0;
    }
    
    /* Modal Body */
    .modal-body {
        padding: 2px 16px;
    }
    
    /* Modal Content */
    .modal-content {
        height: 20%;
        background-color: rgba(255,255,255,0.75);
        opacity:1;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
        border-radius: 25px 25px 0 0;
        animation-name: animatetop;
        animation-duration: 0.4s;
    }
    slot {
        text-transform: uppercase;
        color: var(--ucll-red);
    }
    /* Add Animation */
    @keyframes animatetop {
        from {top: -300px; opacity: 0}
        to {top: 0; opacity: 1}
    }
</style>

<div class="modal-content">
    <div class="modal-header">
        <span class="close">&times;</span>
    </div>
    <div class="modal-body">
        <p>... onderweg naar <slot name="afstudeerrichting"></slot> ...</p>
    </div>
</div>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define('modal-ɮ', class extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(modal_template.content.cloneNode(true));
        this.$modal = this._shadowRoot.querySelector('#myModal');
        this.$span = this._shadowRoot.querySelector('.close');
    }
});
  //#endregion CLASS