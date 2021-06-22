//#region IMPORTS
// import "./fullscreen.js";
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
<!-- <fullscreen-ɮ hidden></fullscreen-ɮ> -->
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
    // this.$fullscreen = this._shadowRoot.querySelector('fullscreen-ɮ');
    this.$loginscreen = this._shadowRoot.querySelector('student-login-ɮ');
    this.$startscreen = this._shadowRoot.querySelector('startscreen-ɮ');
    this.$loginscreen.addEventListener('click', () => {
      this.$loginscreen.hidden = true; this.$interface.hidden = false;
    });
    this.socket = new WebSocket('ws://essadji.be:2105');
  }

  connectedCallback() {
    this.$startscreen.addEventListener('click', () => {
      this.$startscreen.hidden = true;
      this.$loginscreen.hidden = false;
      if (this.getAttribute("fullscreen") == "") {
        console.log("set!!!!")
        if (this.requestFullscreen)
          this.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
          });
      }
      // if (this.$face.hidden) {
      //   this.$face.hidden = false;
      //   this.$interface.hidden = true;
      //   // this.$fullscreen.hidden = true;
      // }

    });
    // this.addEventListener("fullscreen", (e) => {
    //   if (this.requestFullscreen)
    //     this.requestFullscreen().catch(err => {
    //       alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    //     });
    //   if (this.$face.hidden) { this.$face.hidden = false; this.$interface.hidden = true; this.$fullscreen.hidden = true; }
    // });
    this.socket.addEventListener('open', (event) => {
      console.log("opening socket for James ...")
      this.socket.send(JSON.stringify({ "payload": "Hello server, I'm James, at your service." }));
    });
    this.socket.addEventListener('message', (event) => {
      // console.log('Message from server ', event.data);
      let incoming;
      try {
        incoming = JSON.parse(event.data)
      } catch (error) {
        console.warn("PAYLOAD ERROR:")
        console.dir(error)
        incoming = { "payload": "illegal payload" }
      }
      switch (incoming.payload) {
        case 'face':
          if (this.$face.hidden) {
            this.$face.hidden = false;
            this.$interface.hidden = true;
            // this.$fullscreen.hidden = true; 
            this.$startscreen.hidden = true;
            this.$loginscreen.hidden = true;
          }
          break;
        case 'interface':
          if (this.$interface.hidden) {
            this.$face.hidden = true;
            this.$interface.hidden = false;
            // this.$fullscreen.hidden = true;
            this.$startscreen.hidden = true;
            this.$loginscreen.hidden = true;
          }
          break;
        case 'background':
          this.$startscreen.setBackground(incoming.value);
          this.$loginscreen.setBackground(incoming.value);
          this.$interface.setBackground(incoming.value);
          break;
        case 'login':
          this.$loginscreen.setUser(incoming.user, incoming.programme)
          if (this.$startscreen.hidden) {
            this.$face.hidden = true;
            this.$interface.hidden = true;
            // this.$fullscreen.hidden = true;
            this.$startscreen.hidden = false;
            this.$loginscreen.hidden = true;
          }
          break;
      }
    });

  }

  static get observedAttributes() {
    return ["fullscreen"];
  }

  get fullscreen() {
    return this.getAttribute("fullscreen")
  }

  set content(x) {
    this.$content.innerHTML = x;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'fullscreen':
        this.$face.hidden = true;
        // this.$fullscreen.hidden = false;
        break;
    }
  }

});
  //#endregion CLASS