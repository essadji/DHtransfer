//#region IMPORTS
import "./fullscreen.js";
import "./studentLogin.js";
import "./startscreen.js";
import "./face.js";
import "./interface.js";
//#endregion IMPORTS

//#region TEMPLATE
const james_template = document.createElement('template');
james_template.innerHTML = /* html */ `
<style>
  :host {
    background: white;
  }
</style>

<startscreen-ɮ></startscreen-ɮ>
<student-login-ɮ hidden></student-login-ɮ>
<fullscreen-ɮ hidden></fullscreen-ɮ>
<face-ʤ hidden></face-ʤ>
<interface-ʤ hidden></interface-ʤ>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define('james-ʤ', class extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(james_template.content.cloneNode(true));
    this.$content = this._shadowRoot.querySelector('body');
    this.$face = this._shadowRoot.querySelector('face-ʤ');
    this.$interface = this._shadowRoot.querySelector('interface-ʤ');
    this.$fullscreen = this._shadowRoot.querySelector('fullscreen-ɮ');
    this.$loginscreen = this._shadowRoot.querySelector('student-login-ɮ');
    this.$startscreen = this._shadowRoot.querySelector('startscreen-ɮ');
    this.$startscreen.addEventListener('click', () => {
      this.$startscreen.hidden = true; this.$loginscreen.hidden = false;
    });
    this.$loginscreen.addEventListener('click', () => {
      this.$loginscreen.hidden = true; this.$interface.hidden = false;
    });
    this.socket = new WebSocket('ws://localhost:2105');
  }

  connectedCallback() {
    this.addEventListener("fullscreen", (e) => {
      if (this.requestFullscreen)
        this.requestFullscreen().catch(err => {
          alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      if (this.$face.hidden) { this.$face.hidden = false; this.$interface.hidden = true; this.$fullscreen.hidden = true; }
    });
    this.socket.addEventListener('open', (event) => {
      console.log("opening socket for master component...")
      this.socket.send(JSON.stringify({"payload":'Hello server, I\'m a master component; At your service ...'}));
    });
    this.socket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data);
      let incoming = JSON.parse(event.data);
      switch (incoming.payload) {
        case 'face':
          if (this.$face.hidden) { this.$face.hidden = false; this.$interface.hidden = true; this.$fullscreen.hidden = true; this.$startscreen.hidden = true; this.$loginscreen.hidden = true; }
          break;
        case 'interface':
          if (this.$interface.hidden) { this.$face.hidden = true; this.$interface.hidden = false; this.$fullscreen.hidden = true; this.$startscreen.hidden = true; this.$loginscreen.hidden = true; }
          break;
        case 'login':
          this.$loginscreen.setUser(incoming.user, incoming.programme)
          if (this.$startscreen.hidden) { this.$face.hidden = true; this.$interface.hidden = true; this.$fullscreen.hidden = true; this.$startscreen.hidden = false; this.$loginscreen.hidden = true; }
          break;
      }
    });

  }

  static get observedAttributes() {
    return ["fullscreen"];
  }

  set content(x) {
    this.$content.innerHTML = x;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'fullscreen':
        this.$face.hidden = true;
        this.$fullscreen.hidden = false;
        break;
    }
  }

});
  //#endregion CLASS