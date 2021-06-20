//#region IMPORTS
import "./components/pageSelector.js";
import "./components/camera.js";
import "../JAMES/james.js";
import "./components/emotionControl.js";
//#endregion IMPORTS

//#region TEMPLATE

const pageSelector_template = document.createElement('template');
pageSelector_template.innerHTML = /* html */ `

<page-selector-ɮ></page-selector-ɮ>
<camera-ɮ></camera-ɮ>
<emotion-control-ɮ></emotion-control-ɮ>
<james-ʤ></james-ʤ>
 <!--  </body> -->
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