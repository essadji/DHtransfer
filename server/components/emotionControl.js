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
    <svg width="300" height="300">
    <defs>
        <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 0 10 L 0 0 10 0" fill="none" stroke="#444" stroke-width="1" />
        </pattern>
        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#smallGrid)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#444" stroke-width="2" />
        </pattern>
        <radialGradient id="gradient">
            <stop offset="0%" stop-color="#225" />
            <stop offset="95%" stop-color="#115" />
        </radialGradient>
    </defs>

    <g class="main-container" transform="matrix(1 0 0 1 0 0)">
        <rect x=0 y=0 width=300 height=300 fill="url(#gradient)" stroke=white stroke-weight=5 />
        <rect class="boundary" x=0 y=0 width=300 height=300 fill="url(#grid)" stroke=white stroke-weight=5 />

        <!-- <rect class="draggable" x="10" y="10" width="50" height="50" fill="deeppink" transform="matrix(1 0 0 1 0 0)" /> -->
        <circle class="draggable" cx="100" cy="35" r="25" fill="forestgreen" transform="matrix(1 0 0 1 0 0)" />
    </g>
</svg>

</div>
<hr/>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define('emotion-control-ɮ', class extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(emotion_control_template.content.cloneNode(true));
        this.$svg = this._shadowRoot.querySelector('svg');
        this.socket = new WebSocket('ws://essadji.be:2105');
        this.selected = null;
        this.$container = this._shadowRoot.querySelector('svg .main-container')
        this.$container.addEventListener('mousedown', this.beginDrag.bind(this));
        this.$svg.addEventListener('mousemove', this.drag.bind(this)); window.addEventListener('mouseup', this.endDrag.bind(this));
    }

    connectedCallback() {
        this.socket.addEventListener('open', event => {
            console.log("opening socket...")
            this.socket.send('Hello server, I will be your controller today.');
        });
        this.socket.addEventListener('message', event => {
            console.log('Message from server ', event.data);
        });

    }

    handler(e) {
        this.socket.send(e.target.id)
    }

    set content(x) {
        this.$content.innerHTML = x;
    }

    beginDrag(e) {
        e.stopPropagation();
        let target = e.target;

        if (target.classList.contains('draggable')) {
            this.selected = target;
        } else {
            this.selected = this._shadowRoot.querySelector('.main-container');
        }

        this.selected.dataset.startMouseX = e.clientX;
        this.selected.dataset.startMouseY = e.clientY;
    }

    drag(e) {
        let scale = 1;
        if (!this.selected) return;
        e.stopPropagation();

        let startX = parseFloat(this.selected.dataset.startMouseX),
            startY = parseFloat(this.selected.dataset.startMouseY),
            dx = (e.clientX - startX),
            dy = (e.clientY - startY);

        if (this.selected.classList.contains('draggable')) {
            let selectedBox = this.selected.getBoundingClientRect(),
                boundaryBox = this.selected.parentElement.getBoundingClientRect();

            // if (selectedBox.right + dx > boundaryBox.right) {
            //     dx = (boundaryBox.right - selectedBox.right);
            // } else if (selectedBox.left + dx < boundaryBox.left) { dx = (boundaryBox.left - selectedBox.left); } if
            //     (selectedBox.bottom + dy > boundaryBox.bottom) {
            //     dy = (boundaryBox.bottom - selectedBox.bottom);
            // }
            // else if (selectedBox.top + dy < boundaryBox.top) { dy = (boundaryBox.top - selectedBox.top); }
        } let
            currentMatrix = this.selected.transform.baseVal.consolidate().matrix, newMatrix = currentMatrix.translate(dx / scale, dy
                / scale), transform = this.$svg.createSVGTransformFromMatrix(newMatrix);
        this.selected.transform.baseVal.initialize(transform); this.selected.dataset.startMouseX = dx + startX;
        this.selected.dataset.startMouseY = dy + startY;
    }

    endDrag(e) {
        e.stopPropagation(); if (this.selected) {
            this.selected = undefined;
        }
    }

});

  //#endregion CLASS