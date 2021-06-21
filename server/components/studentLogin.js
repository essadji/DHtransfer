//#region IMPORTS
//#endregion IMPORTS

//#region TEMPLATE
const student_login_template = document.createElement('template');
student_login_template.innerHTML = /* html */ `
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
    font-size: 20pt;
    margin:0 0 10px 0px;
  }
  h1{
    color: var(--ucll-red);
    font-size: 30pt;
    margin:10px 10px 0 10px;
  }
  #content {
    background: url('../images/diepenbeek2020_header_0.png') no-repeat center center fixed;
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
        <div class="card"  >
            <h1>Welcome</h1>
            <h4></h4>
        </div>
    </div>
</div>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define('student-login-ɮ', class extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(student_login_template.content.cloneNode(true));
        this.$content = this._shadowRoot.querySelector('#content');

    }
setUser(name,programme){
  console.log("set called")
  this._shadowRoot.querySelector("h1").innerHTML=name?`Welcome, ${name}`:`Welcome`;
  this._shadowRoot.querySelector("h4").innerHTML =programme?`Opleiding ${programme}`:``;
}
    set content(x) {
        this.$content.innerHTML = x;
    }

});
  //#endregion CLASS