//#region IMPORTS
import "./pageSelector.js";
import "./camera.js";
import "./james.js";
import "./emotionControl.js";
//#endregion IMPORTS

//#region TEMPLATE

const pageSelector_template = document.createElement('template');
pageSelector_template.innerHTML = /* html */ `

<style>
    :host {
        background-color: var(--base);
    }
.grid-container {
    display:grid;
}
page-selector-ɮ {
      grid-column-start: 1;
  grid-column-end: 5;
    grid-row-start: 1;
  grid-row-end: 2;
}
camera-ɮ {
      grid-column-start: 2;
  grid-column-end: 4;
    grid-row-start: 2;
  grid-row-end: 4;
  
}
lever-ɮ#eye_L {
      grid-column-start: 1;
  grid-column-end: 2;
}
lever-ɮ#eye_R {
      grid-column-start: 4;
  grid-column-end: 5;
}
lever-ɮ#pupil_L {
      grid-column-start: 1;
  grid-column-end: 2;
}
lever-ɮ#pupil_R {
      grid-column-start: 4;
  grid-column-end: 5;
}
james-ʤ {
          grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 4;
}

</style>
<div class="grid-container">

<page-selector-ɮ></page-selector-ɮ>
<!-- <camera-ɮ></camera-ɮ> -->
<emotion-control-ɮ id="eye_L"></emotion-control-ɮ>
<emotion-control-ɮ id="eye_R"></emotion-control-ɮ>
<emotion-control-ɮ id="pupil_L"></emotion-control-ɮ>
<emotion-control-ɮ id="pupil_R"></emotion-control-ɮ>
<james-ʤ></james-ʤ>
</div>

`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define('j_con-ɮ', class extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(pageSelector_template.content.cloneNode(true));
        this.socket = new WebSocket('ws://essadji.be:2105');
    }

    connectedCallback() {
        this.socket.addEventListener('open', (event) => {
            console.log("opening socket...")
            this.socket.send('Hello server, I will be your controller today.');
        });
        this.socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
        });

    }

    handler(e) {
        // console.dir(e.target.id)
        // console.dir(this)
        this.socket.send(e.target.id)

    }

    static get observedAttributes() {

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