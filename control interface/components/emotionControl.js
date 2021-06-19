//#region IMPORTS

//#endregion IMPORTS

//#region TEMPLATE

const emotion_control_template = document.createElement('template');
emotion_control_template.innerHTML = /* html */ `
<style>
    h2{
        margin: 15px;
        color: var(--ucll-red);
    }

</style>

<div>
    <h2>Control eyes:</h2>

</div>
<hr/>
<!--  </body> -->
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define('emotion-control-ɮ', class extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(emotion_control_template.content.cloneNode(true));
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