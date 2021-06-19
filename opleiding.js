//#region IMPORTS
//#endregion IMPORTS

//#region TEMPLATE
const opleiding_template = document.createElement('template');
opleiding_template.innerHTML = /* html */ `
  <style>
   	/* @import "./opleiding.css"; */
     div {

     }
  </style>

  <div id="Elektromechanica" class="slider-item title-text">
    <div class="animation-card_content">
      <h4 class="animation-card_content_title title-2"><slot id="richting"></slot></h4>
        <p class="animation-card_content_description p-2">Onderhoudstechnologie | Automatisering | Klimatisering | Elektromechanica </p>
    </div>
  </div>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define('opleiding-ʤ', class extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(opleiding_template.content.cloneNode(true));
        this.$content = this._shadowRoot.querySelector('#content');
        this.$comments = this._shadowRoot.querySelector('#comments');
    }

    static get observedAttributes() {
        return ['sub'];
    }

    set content(x) {
        this.$content.innerHTML = x;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'sub':

                break;
        }
    }

});
  //#endregion CLASS