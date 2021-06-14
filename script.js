//HTML code for cards
let htmlBegin = 'class="slider-item title-text"><div class="animation-card_content"> <h4 class="animation-card_content_title title-2">';
let htmlMidle = '</h4><p class="animation-card_content_description p-2">';
let htmlEnd = '</p></div></div>';

let opleidingenLijst = "";
let richtingLijst = '';

$(document).ready(function () {
    opleidingenLijst = getOpleidingenLijst();
    $('#courses-slider').html(opleidingenLijst);
    $('#campus').bind("click", function () {
        $('#courses-slider').html(opleidingenLijst);
        bindCardsEvents();
        GoInFullscreen();
    });
    bindCardsEvents();
});

function bindCardsEvents() {
    for (let opleiding in Opleidingen) {
        let id = "#" + opleiding;
        $(id).bind("click", function () {
            showDetails(opleiding);
        });
    }
}

function showDetails(opleiding) {
    let afstudeerrichtingen = Object.keys(Opleidingen[opleiding]['Afstudeerrichtingen']);
    richtingLijst = "";
    //Get all directions per richting
    for (let i = 0; i < afstudeerrichtingen.length; i++) {
        let afstudeerRichting = afstudeerrichtingen[i];
        let diplomaLijst = Opleidingen[opleiding].Afstudeerrichtingen[afstudeerRichting].Diploma;
        let templijst = diplomaLijst.replace(" | ", "<br>");
        richtingLijst += '<div  id="' + afstudeerRichting + '"' + htmlBegin + afstudeerRichting + htmlMidle + templijst + htmlEnd;
        $('#courses-slider').html(richtingLijst);
    }
}

function getOpleidingenLijst() {
    let opleidingenCards = '';

    //Get all opleidingen
    for (let opleiding in Opleidingen) {
        let afstudeerrichtingenLijst = '';
        let afstudeerrichtingen = Object.keys(Opleidingen[opleiding]['Afstudeerrichtingen']);

        // Get all directions per opleiding
        for (let i = 0; i < afstudeerrichtingen.length; i++) {
            let afstudeerRichting = afstudeerrichtingen[i];
            afstudeerrichtingenLijst += Opleidingen[opleiding].Afstudeerrichtingen[afstudeerRichting].Name + ' | ';
        }
        // afstudeerrichtingen.map(richting=>{afstudeerrichtingenLijst+=Opleidingen[opleiding].Afstudeerrichtingen[richting].Name + ' | '})

        afstudeerrichtingenLijst = afstudeerrichtingenLijst.substring(0, afstudeerrichtingenLijst.length - 2);
        opleidingenCards += '<div  id="' + opleiding + '"' + htmlBegin + opleiding + htmlMidle + afstudeerrichtingenLijst + htmlEnd;
    }
    return opleidingenCards;
}

function GoInFullscreen() {
    let element = document.getElementById("content");
    if (element.requestFullscreen)
        element.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    else if (element.mozRequestFullScreen)
        element.mozRequestFullScreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    else if (element.webkitRequestFullscreen)
        element.webkitRequestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    else if (element.msRequestFullscreen)
        element.msRequestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
}