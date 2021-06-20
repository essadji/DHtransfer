//#region IMPORTS
import "./components/fullscreen.js";
import "./components/face.js";
import "./components/interface.js";
//#endregion IMPORTS

//#region TEMPLATE
const james_template = document.createElement('template');
james_template.innerHTML = /* html */ `
<style>
  :host {background: white;}
</style>
<fullscreen-ɮ></fullscreen-ɮ>
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
    this.socket = new WebSocket('ws://essadji.be:2105');
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
      this.socket.send('Hello server, I\'m a master component; At your service ...');
    });
    this.socket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data);
      switch (event.data) {
        case 'face':
          if (this.$face.hidden) { this.$face.hidden = false; this.$interface.hidden = true; this.$fullscreen.hidden = true; }
          break;
        case 'interface':
          if (this.$interface.hidden) { this.$interface.hidden = false; this.$face.hidden = true; this.$fullscreen.hidden = true; }
          break;
        case 'interface':
          break;
      }
    });

  }

  static get observedAttributes() {
    return [];
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