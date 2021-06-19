//#region IMPORTS
import "./opleiding.js";
import "./face.js";
import "./interface.js";
//#endregion IMPORTS

//#region TEMPLATE
const james_template = document.createElement('template');
james_template.innerHTML = /* html */ `
<style>
    body {margin:0};
    
</style>
<face-ʤ></face-ʤ>
<interface-ʤ hidden></interface-ʤ>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define('james-ʤ', class extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(james_template.content.cloneNode(true));
    this.$content = this._shadowRoot.querySelector('#content');
    this.$face = this._shadowRoot.querySelector('face-ʤ');
    this.$interface = this._shadowRoot.querySelector('interface-ʤ');
    this.socket = new WebSocket('ws://essadji.be:2105');
  }

  connectedCallback() {
    this.socket.addEventListener('open', (event) => {
      console.log("opening socket for master component...")
      this.socket.send('Hello server, I\'m a master component; At your service ...');
    });
    this.socket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data);
      switch (event.data) {
        case 'face':
          console.dir(this.$face);
          console.log(this.$face.hidden);
          if (this.$face.hidden) { this.$face.hidden = false; this.$interface.hidden = true }
          break;
        case 'interface':
          console.dir(this.$interface);
          console.log(this.$interface.hidden);
          if (this.$interface.hidden) { this.$interface.hidden = false; this.$face.hidden = true }
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