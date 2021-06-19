//#region IMPORTS
//#endregion IMPORTS

//#region TEMPLATE
const opleiding_template = document.createElement('template');
opleiding_template.innerHTML = /* html */ `
  <style>
    .slider-item {
      width: 630px;
      padding: 20px 0 20px 30px;
      border-radius: 10px;
      background-color: #ffffff;
      display: flex;
      justify-content: center;
      z-index: 0;
      margin-bottom: 25px;
    }
    .slider-item .animation-card_content {
      width: 100%;
      margin-right: 26px;
      margin-left: 26px;
      font-family: 'Open Sans', sans-serif;
    }
    .slider-item .animation-card_content .animation-card_content_title {
      color: var(--ucll-red);
      font-size: 20pt;
      line-height: 24px;
      margin: 0;
    }
    .slider-item .animation-card_content .animation-card_content_description {
      color: #696d74;
      font-size: 15px;
      font-weight: 300;
      letter-spacing: normal;
      line-height: 24px;
      margin: 10px 0 0 0;
    }
  </style>

  <div id="Elektromechanica" class="slider-item title-text">
    <div class="animation-card_content">
      <h4 class="animation-card_content_title title-2"><slot id="richting"></slot></h4>
        <p class="animation-card_content_description p-2">Onderhoudstechnologie | Automatisering | Klimatisering | Elektromechanica </p>
    </div>
  </div>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define('opleiding-ʤ', class extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(opleiding_template.content.cloneNode(true));
    this.$content = this._shadowRoot.querySelector('#content');
  }

  static get observedAttributes() {
    return ['sub'];
  }

  set content(x) {
    this.$content.innerHTML = x;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'sub':

        break;
    }
  }

});
//#endregion CLASS