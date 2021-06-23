//#region IMPORTS
//#endregion IMPORTS

//#region TEMPLATE
const startscreen_template = document.createElement('template');
startscreen_template.innerHTML = /* html */ `
<style>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700');
  @import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap');
  * {
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    }
  h4{
    /* font-family: 'Kaushan Script', cursive; */
    font-style:italic;
    color: #44474b;
    font-size: 20pt;
    margin:0 0 10px 0px;
  }
  h1{
    color: var(--ucll-red);
    font-size: 30pt;
    margin:10px 10px 0 10px;
  }
  #content {
    background: url('../images/panorama.png') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    font-weight: bold;
    margin: 0;
  }
  .background{
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-left: 50px;
    padding-right:50px;
    height: 100vh;
  }
  .card {
    text-align: center;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 25px;
  }
</style>

<div id="content">
    <div class="background" >
        <div id="card" class="card">
            <h1>Ik ben James, kan ik u helpen?</h1>
            <h4>Raak het scherm aan om de tour te beginnen</h4>
        </div>
    </div>
</div>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define('startscreen-ɮ', class extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(startscreen_template.content.cloneNode(true));
    this.$content = this._shadowRoot.querySelector('#content');
    this.$card = this._shadowRoot.querySelector('#card');
    this.$card.addEventListener("click", () => {

    });

  }
  setBackground(url) {
    this.$content.style.backgroundImage = `url(${url})`;
  }
  set content(x) {
    this.$content.innerHTML = x;
  }

});

//#endregion CLASS