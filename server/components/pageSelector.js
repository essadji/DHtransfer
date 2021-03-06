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
    <button id="btnClients">ENUMERATE CLIENTS</button>
    <button id="btnInterface">SHOW INTERFACE</button>
    <button id="btnFace">SHOW JAMES</button>
    <button id="btnLogin">INITIATE LOGIN FOR:</button>&nbsp;name&nbsp;<input type="text" id="user" />&nbsp;programme&nbsp;<input type="text" id="programme" />
    <button id="btnNodal">CLOSE MODALS</button>
    <select>
    <option value="../images/toren.jpg">toren</option>
    <option value="../images/panorama.png" selected>panorama</option>
    <option>
    </select>
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
        this.$select = this._shadowRoot.querySelector("select");
    }
    
    connectedCallback() {
        this.$select.addEventListener("change",this.backer.bind(this))
        this.$test.forEach(x => { x.addEventListener('click', this.handler.bind(this)) });
        this.socket.addEventListener('open', (event) => {
            console.log("opening socket for page selector ...")
            this.socket.send(JSON.stringify({"payload":'Hello server, I will be swapping pages today.'}));
        });

        // this.socket.addEventListener('message', function (event) {
        //     console.log('Message from server ', event.data);
        // });

    }

backer(e){
    console.log("select change!")
    this.socket.send(JSON.stringify({ "payload": "selectBackground","value":e.target.value }));
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