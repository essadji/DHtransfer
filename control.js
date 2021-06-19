//#region IMPORTS

//#endregion IMPORTS

//#region TEMPLATE
const J_con_template = document.createElement('template');
J_con_template.innerHTML = /* html */ `
  <button id="message">random message</button>
  <button id="test">send id</button>
  <button id="clients">client request</button>
 <!--  </body> -->
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define('j_con-ɮ', class extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(J_con_template.content.cloneNode(true));
        this.$test = this._shadowRoot.querySelectorAll('button');
        this.socket = new WebSocket('ws://essadji.be:2105');
    }

    connectedCallback() {
        this.$test.forEach(x=>{x.addEventListener('click', this.handler.bind(this))});
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