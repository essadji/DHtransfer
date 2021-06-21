//#region IMPORTS

//#endregion IMPORTS

//#region TEMPLATE

const camera_template = document.createElement('template');
camera_template.innerHTML = /* html */ `
<style>
    h2{margin: 15px;
        color: var(--ucll-red);
    }
    #container {
        margin: 15px;
        width: 500px;
        height: 375px;
        border: 10px #333 solid;
    }
    #videoElement {
        width: 500px;
        height: 375px;
        background-color: #666;
    }
</style>

<div>
    <h2>Camera feed:</h2>
    <div id="container">
	    <video id="videoElement" autoplay></video>
    </div>
</div>
<hr/>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define('camera-ɮ', class extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(camera_template.content.cloneNode(true));
        this.$videoElement = this._shadowRoot.querySelectorAll('#videoElement');
    }

    connectedCallback() {
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    this.$videoElement.srcObject = stream;
                    console.log(this.$videoElement.srcObject);
                })
                .catch((error) => {
                    console.log("Something went wrong!");
                    console.dir(error);
                });
        }
    }

    handler(e) {
        this.socket.send(e.target.id)
    }

    set content(x) {
        this.$content.innerHTML = x;
    }
});
  //#endregion CLASS