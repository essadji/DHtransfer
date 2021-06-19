//#region IMPORTS
import "./opleiding.js";
//#endregion IMPORTS

//#region TEMPLATE
const james_template = document.createElement('template');
james_template.innerHTML = /* html */ `
<face-ʤ></face-ʤ>
<interface-ʤ></interface-ʤ>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define('james-ʤ', class extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(james_template.content.cloneNode(true));
        this.$content = this._shadowRoot.querySelector('#content');
      fetch("opleidingen.json")
        .then(response => response.json())
        .then(json => {this.opleidingen = json; Object.keys(json).map((opleiding=>{
          // console.log(opleiding)
          
            let o = document.createElement('opleiding-ʤ');
            o.innerHTML = opleiding;
            o.id = opleiding;
           
            o.addEventListener('click', (x) => {
              // c[i].setAttribute('active','');
              console.log("click!")
            })
          this.shadowRoot.querySelector('#courses-slider').appendChild(o)
        }))});
        
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

});
  //#endregion CLASS