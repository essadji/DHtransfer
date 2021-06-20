//#region IMPORTS
//#endregion IMPORTS

//#region TEMPLATE
const modal_template = document.createElement('template');
modal_template.innerHTML = /* html */ `
    <style>
        /* Modal Header */
        .modal-header {
            padding: 2px 16px;
            background-color: #5cb85c;
            color: white;
            }

        /* Modal Body */
        .modal-body {padding: 2px 16px;}

        /* Modal Footer */
        .modal-footer {
            background-color: #5cb85c;
            color: white;
            padding: 2px 16px;
        }

        /* Modal Content */
        .modal-content {
           height: 20%;
            background-color: #fefefe;
            opacity:1;
           /* margin: auto;
            padding: 0;
            border: 1px solid #888;
            width: 80%; */
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
            animation-name: animatetop;
            animation-duration: 0.4s;
 
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
            <p>Onderweg naar <slot name="afstudeerrichting">. Volg mij!</p>
        </div>
        <div class="modal-footer">
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
        //this.$modal.style.display = "block";

        // this.$span.addEventListener('click', ()=> {
        //     this.$modal.style.display = "none";
        // })

    }

});
  //#endregion CLASS