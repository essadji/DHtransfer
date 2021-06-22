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

<div>
    <h2>Select page to display:</h2>
    <button id="btnClients">ENUMERATE CLIENTS</button>
    <button id="btnInterface">SHOW INTERFACE</button>
    <button id="btnFace">SHOW JAMES</button>
    <button id="btnLogin">SHOW LOGIN</button>name<input type="text" id="user" />programme<input type="text" id="programme" />
    <button id="btnNodal">CLOSE MODALS</button>
</div>
<hr/>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define('page-selector-ɮ', class extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(emotion_control_template.content.cloneNode(true));
        this.$test = this._shadowRoot.querySelectorAll('button');
        this.socket = new WebSocket('ws://essadji.be:2105');
    }

    connectedCallback() {
        this.$test.forEach(x => { x.addEventListener('click', this.handler.bind(this)) });
        this.socket.addEventListener('open', (event) => {
            console.log("opening socket for page selector ...")
            this.socket.send(JSON.stringify({"payload":'Hello server, I will be your controller today.'}));
        });
        this.socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
        });

    }

    handler(e) {
        this.socket.send(JSON.stringify({
            "payload": e.target.id,
            "user": this._shadowRoot.querySelector("#user").value || null,
            "programme": this._shadowRoot.querySelector("#programme").value || null
        }))
    }

    set content(x) {
        this.$content.innerHTML = x;
    }
});
  //#endregion CLASS