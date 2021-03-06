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
        overflow-x: hidden;
    }
    .grid-container {
        display:grid;
        grid-template-columns: 300px auto auto 300px;
    }
    page-selector-ɮ {
        grid-column-start: 1;
        grid-column-end: 5;
        grid-row-start: 1;
        grid-row-end: 2;
    }
/*    camera-ɮ {
        grid-column-start: 2;
        grid-column-end: 4;
        grid-row-start: 2;
        grid-row-end: 4;
    } */
    lever-ɮ#eye_L {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 3;
        grid-row-end: 4;
    }
    lever-ɮ#eye_R {
        grid-column-start: 4;
        grid-column-end: 5;
        grid-row-start: 3;
        grid-row-end: 4;
    }
    lever-ɮ#pupil_L {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 4;
        grid-row-end: 5;
    }
    lever-ɮ#pupil_R {
        grid-column-start: 4;
        grid-column-end: 5;
        grid-row-start: 4;
        grid-row-end: 5;
    }
    james-ʤ {
        grid-column-start: 2;
        grid-column-end: 4;
        grid-row-start: 2;
        grid-row-end: 5;
    }

</style>

<div class="grid-container">
    <page-selector-ɮ></page-selector-ɮ>
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
        this.addEventListener("move", (e) => {
            this.socket.send(JSON.stringify({ "payload": "move", "target": e.detail.source, "x": e.detail.valueX, "y": e.detail.valueY }))
        });
    }

    connectedCallback() {
        this.socket.addEventListener('open', event => {
            // console.log("opening socket for controller ...")
            this.socket.send(JSON.stringify({ "payload": 'Hello server, I will be your controller today.' }));
        });
        this.socket.addEventListener('message', event => {
            // console.log('Message from server ', event.data);
        });

    }

    handler(e) {
        this.socket.send(JSON.stringify({ "payload": e.target.id }))
    }

    set content(x) {
        this.$content.innerHTML = x;
    }
});
  //#endregion CLASS