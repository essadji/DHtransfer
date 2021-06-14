//#region IMPORTS
import "./opleiding.js";
//#endregion IMPORTS

//#region TEMPLATE
const james_template = document.createElement('template');
james_template.innerHTML = /* html */ `
  <link rel="stylesheet" href="./james.css" />

  <body>
    <div id="content" class="grid">
      <div class="grid-item">
        <div id="campus" class="title-text">
          <h1>CAMPUS DIEPENBEEK</h1>
          <h4>TECHNOLOGIE</h4>
        </div>
      </div>
      <div class="grid-item">
       <div class="slider-wrap">
          <div id="courses-slider" class="slider">
            <!--Component insertion here-->
          </div>
        </div>
      </div>
    </div>
  </body>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define('james-ʤ', class extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(james_template.content.cloneNode(true));
        this.$content = this._shadowRoot.querySelector('#content');
        this.$comments = this._shadowRoot.querySelector('#comments');
      fetch("opleidingen.json")
        .then(response => response.json())
        .then(json => {this.opleidingen = json; Object.keys(json).map((opleiding=>{
          console.log(opleiding)
          
            let o = document.createElement('opleiding-ʤ');
           
            o.addEventListener('click', (x) => {
              // c[i].setAttribute('active','');
              console.log("ckick!")
            })
          this.shadowRoot.querySelector('#courses-slider').appendChild(o)
        }))});
        
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