$(document).ready(function () {
    console.log('ready!');
    let opleidingenLijst = getOpleidingenLijst();
    $('#courses-slider').html(opleidingenLijst);
    var cards = $('#courses-slider .slider-item').toArray();

    startAnim(cards);
});


function startAnim(array) {
    if (array.length >= 4) {
        TweenMax.fromTo(
            array[0],
            0.5,
            { x: 800, y: 0, opacity: 0.75 },
            {
                x: 800,
                y: -120,
                opacity: 0,
                zIndex: 0,
                delay: 0.03,
                ease: Cubic.easeInOut,
                onComplete: sortArray(array),
            }
        );

        TweenMax.fromTo(
            array[1],
            0.5,
            { x: 750, y: 125, opacity: 1, zIndex: 1 },
            {
                x: 800,
                y: 0,
                opacity: 0.75,
                zIndex: 0,
                boxShadow: '-5px 8px 8px 0 rgba(82,89,129,0.05)',
                ease: Cubic.easeInOut,
            }
        );

        TweenMax.to(array[2], 0.5, {
            bezier: [
                { x: 800, y: 250 },
                { x: 750, y: 200 },
                { x: 750, y: 125 },
            ],
            boxShadow: '-5px 8px 8px 0 rgba(82,89,129,0.05)',
            zIndex: 1,
            opacity: 1,
            ease: Cubic.easeInOut,
        });

        TweenMax.fromTo(
            array[3],
            0.5,
            { x: 800, y: 400, opacity: 0, zIndex: 0 },
            { x: 800, y: 250, opacity: 0.75, zIndex: 0, ease: Cubic.easeInOut }
        );
    } else {
        $('#card-slider').append(
            '<p>Sorry, carousel should contain more than 3 slides</p>'
        );
    }
}
function sortArray(array) {
    clearTimeout(delay);
    var delay = setTimeout(function () {
        var firstElem = array.shift();
        array.push(firstElem);
        return startAnim(array);
    }, 6000);
}

function getOpleidingenLijst() {
    let opleidingenCards = '';
    //HTML code for cards
    let htmlBegin = '<div class="slider-item title-text"><div class="animation-card_content"><h4 class="animation-card_content_title title-2">';
    let htmlMidle = '</h4><p class="animation-card_content_description p-2">';
    let htmlEnd = '</p></div></div>';

    //Get all opleidingen
    for (let opleiding in Opleidingen) {
        let afstudeerrichtingenLijst = '';
        let afstuddeerrichtingen = Object.keys(Opleidingen[opleiding]['Afstudeerrichtingen']);

        //Get all directions per opleiding
        for (let i = 0; i < afstuddeerrichtingen.length; i++) {
            let afstudeerRichting = afstuddeerrichtingen[i];
            afstudeerrichtingenLijst += Opleidingen[opleiding]['Afstudeerrichtingen'][afstudeerRichting]['Name'] + ' | ';
        }

        afstudeerrichtingenLijst = afstudeerrichtingenLijst.substring(0, afstudeerrichtingenLijst.length - 2);
        opleidingenCards += htmlBegin + opleiding + htmlMidle + afstudeerrichtingenLijst + htmlEnd;
    }
    return opleidingenCards;
}
