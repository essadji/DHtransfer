
var hasWebgl = (function () {
    try {
        return !!window.WebGLRenderingContext
            && !!(document.createElement('canvas').getContext('webgl')
                || document.createElement('canvas').getContext('experimental-webgl'));
    } catch (e) {
        return false;
    }
})();

$(function () {

    var container = $('#content')[0];

    Two.Resolution = 24;

    var svg = new Two({
        width: 400,
        height: 400
    }).appendTo(container);
    var webgl = new Two({
        width: 400,
        height: 400,
        type: hasWebgl ? Two.Types.webgl : Two.Types.canvas
    }).appendTo(container);
    var canvas = new Two({
        width: 400,
        height: 400,
        type: Two.Types.canvas
    }).appendTo(container);

    var eyes = [
        makeEye(svg),
        makeEye(webgl),
        makeEye(canvas)
    ];

    eyes[0].domElement = svg.renderer.domElement;
    eyes[1].domElement = webgl.renderer.domElement;
    eyes[2].domElement = canvas.renderer.domElement;

    var releaseEyes = _.debounce(function () {
        eyes.forEach(function (eye) {
            eye.ball.destination.clear();
        });
    }, 1000);

    var $window = $(window)
        .bind('mousemove', mousemove)
        .bind('touchmove', function (e) {
            var touch = e.originalEvent.changedTouches[0];
            mousemove({
                clientX: touch.pageX,
                clientY: touch.pageY
            });
            return false;
        });

    svg.bind('update', function () {
        var eye = eyes[0];
        eye.ball.translation.x += (eye.ball.destination.x - eye.ball.translation.x) * 0.0625;
        eye.ball.translation.y += (eye.ball.destination.y - eye.ball.translation.y) * 0.0625;
    }).play();
    webgl.bind('update', function () {
        var eye = eyes[1];
        eye.ball.translation.x += (eye.ball.destination.x - eye.ball.translation.x) * 0.0625;
        eye.ball.translation.y += (eye.ball.destination.y - eye.ball.translation.y) * 0.0625;
    }).play();
    canvas.bind('update', function () {
        var eye = eyes[2];
        eye.ball.translation.x += (eye.ball.destination.x - eye.ball.translation.x) * 0.0625;
        eye.ball.translation.y += (eye.ball.destination.y - eye.ball.translation.y) * 0.0625;
    }).play();

    function mousemove(e) {

        var mouse = new Two.Vector(e.clientX, e.clientY);
        eyes.forEach(function (eye) {
            var rect = eye.domElement.getBoundingClientRect();
            var center = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
            var theta = Math.atan2(mouse.y - center.y, mouse.x - center.x);
            var distance = mouse.distanceTo(center);
            var pct = distance / $window.width();
            var radius = 75 * pct;
            eye.ball.destination.set(radius * Math.cos(theta), radius * Math.sin(theta));
        });

        releaseEyes();

    }

    function makeEye(two, color) {

        var ball = two.makeGroup();
        var eye = two.makeGroup();

        var retina = two.makeCircle(0, 0, two.height / 4);
        retina.fill = color || getRandomColor();
        retina.noStroke();

        var pupil = two.makeCircle(0, 0, two.height / 6);
        pupil.fill = '#333';
        pupil.linewidth = 10;
        pupil.noStroke();
        var reflection = two.makeCircle(two.height / 12, - two.height / 12, two.height / 12)
        reflection.fill = 'rgba(255, 255, 255, 0.9)';
        reflection.noStroke();

        var lid = two.makeEllipse(0, 0, two.height / 3, two.height / 4);
        lid.stroke = '#333';
        lid.linewidth = 15;
        lid.noFill();

        var eyeMask = two.makeEllipse(0, 0, two.height / 3, two.height / 4);
        eyeMask.noStroke();

        var container = two.makeGroup(ball);

        ball.add(retina, pupil, reflection);
        ball.destination = new Two.Vector();

        eye.add(container, eyeMask, lid);
        eye.translation.set(two.width / 2, two.height / 2);

        container.mask = eyeMask;

        eye.ball = ball;

        return eye;

    }

    function getRandomColor() {
        return 'rgba('
            + Math.floor(Math.random() * 255) + ','
            + Math.floor(Math.random() * 255) + ','
            + Math.floor(Math.random() * 255) + ','
            + 0.66 + ')';
    }

});
