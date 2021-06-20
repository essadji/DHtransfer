//#region IMPORTS
import "./opleiding.js";
//#endregion IMPORTS

//#region TEMPLATE
const interface_template = document.createElement('template');
interface_template.innerHTML = /* html */ `

  <style>
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700');
    @import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap');
    * {
      box-sizing: border-box;
      font-family: 'Open Sans', sans-serif;
    }
    h4{
      font-family: 'Kaushan Script', cursive;
      font-style:italic;
      color: #44474b;
      font-size: 30pt;
      margin:0 0 10px 50px;
    }
    h1{
      color: var(--ucll-red);
      font-size: 30pt;
      margin:10px 10px 0 10px;
    }
    #content {
      background: url('../images/diepenbeek2020_header_0.png') no-repeat center center
        fixed;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
      font-weight: bold;
      margin: 0;
    }

    #campus-grid{
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding-left: 50px;
    }
    .grid {
      height: 100vh;
      width: 100vw;
      display: grid;
      grid-template-columns: repeat(2, auto);
      grid-template-rows: auto auto;
      gap: 1rem;
    }

    .grid-item {
      display: grid;
      place-items: center;
      height: 95vh;
      color: #000;
    }

    .title-text {
      text-align: center;
      background-color: rgba(255, 255, 255, 0.8);
      width: 90%;
      border-radius: 25px;
    }

    .selected-item-card{
      text-align: center;
      width: 90%;
      border-radius: 25px;
      background: var(--ucll-red);
      padding: 5px 10px 10px 10px;
      margin-top: 10px;
    }
    .selected-item-card h1{
      color: white;
      font-size: 20pt;
    }

    .slider-wrap {
      height: auto;
    }
    .slider-wrap .slider {
      display: grid;
      justify-content: center;}

      .divider{
        font-weight: bold;
        font-size: larger;
        color: var(--ucll-red)
      }
}
  </style>

  <div id="content" class="grid">
    <div id="campus-grid" >
      <div id="campus" class="title-text"  >
        <h1>CAMPUS DIEPENBEEK</h1>
        <h4>technologie</h4>
      </div>
      <div class="selected-item-card" id="deselect" hidden>
        <h1 id="selection"></h1>
      </div>
    </div>
    <div id="courses-grid" class="grid-item">
      <div class="slider-wrap">
        <div id="courses-slider" class="slider">
          <!--Component insertion here-->
        </div>
      </div>
    </div>
    <div id="details-grid" class="grid-item" style="display:none">
      <div class="slider-wrap">
        <div id="detail-slider" class="slider">
          <!--Component insertion here-->
        </div>
      </div>
    </div>
  </div>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define('interface-ʤ', class extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(interface_template.content.cloneNode(true));
    this.$content = this._shadowRoot.querySelector('#content');
    this.$coursesSlider = this._shadowRoot.querySelector('#courses-slider');
    this.$detailSlider = this._shadowRoot.querySelector('#detail-slider');
    this.$campusGrid = this._shadowRoot.querySelector('#campus-grid');
    this.$coursesGrid = this._shadowRoot.querySelector('#courses-grid');
    this.$detailGrid = this._shadowRoot.querySelector('#details-grid');
    this.$selection = this._shadowRoot.querySelector('#selection');
    this.$deselect = this._shadowRoot.querySelector("#deselect");
    this.$deselect.addEventListener("click", this.deselect.bind(this))

    fetch("../data/opleidingen.json")
      .then(response => response.json())
      .then(json => {
        this.opleidingen = json;
        // console.dir(this.opleidingen);
        Object.keys(this.opleidingen).map((opleiding => {
          let o = document.createElement('opleiding-ʤ');
          let c = document.createElement('container')
          c.setAttribute("slot", "richting")
          c.innerHTML = opleiding;
          o.append(c)
          o.id = opleiding;
          let richtingen = this.opleidingen[opleiding].Afstudeerrichtingen;
          // console.dir(richtingen)
          let stringbuilder = '';
          let ac = document.createElement('container')
          ac.setAttribute("slot", "afstudeerrichting")
          Object.keys(richtingen).map(k => {
            stringbuilder += k + ("<span class='divider'> | </span>")
          })
          ac.innerHTML = stringbuilder.substring(0, stringbuilder.length - 32);
          o.append(ac)

          o.addEventListener('click', (x) => {
            this.$deselect.hidden = false;
            this.$selection.innerHTML = x.target.innerHTML.toUpperCase();
            this.$detailSlider.innerHTML = '';
            console.dir(this.opleidingen.Afstudeerrichtingen);
            this.$coursesGrid.style.display = "none";
            Object.keys(this.opleidingen).map((afstudeerrichting => {
              let d = document.createElement('opleiding-ʤ');
              d.innerHTML = afstudeerrichting;
              d.id = afstudeerrichting;
              this.$detailSlider.appendChild(d);
            }));
            this.$detailGrid.style.display = "grid";
          })
          this.$coursesSlider.appendChild(o);
        }))
      });
  }

  deselect() {

  }

  static get observedAttributes() {
    return ['kenny'];
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