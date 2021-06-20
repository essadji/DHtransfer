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
<script>

    const maxScale = 5,
        minScale = 0.15;

    var selected,
        scale = 1,
        svg = document.querySelector('svg');

    function beginDrag(e) {
        e.stopPropagation();
        let target = e.target;

        if (target.classList.contains('draggable')) {
            selected = target;
        } else {
            selected = document.querySelector('.main-container');
        }

        selected.dataset.startMouseX = e.clientX;
        selected.dataset.startMouseY = e.clientY;
    }

    function drag(e) {
        if (!selected) return;
        e.stopPropagation();

        let startX = parseFloat(selected.dataset.startMouseX),
            startY = parseFloat(selected.dataset.startMouseY),
            dx = (e.clientX - startX),
            dy = (e.clientY - startY);

        if (selected.classList.contains('draggable')) {
            let selectedBox = selected.getBoundingClientRect(),
                boundaryBox = selected.parentElement.getBoundingClientRect();

            // if (selectedBox.right + dx > boundaryBox.right) {
            //     dx = (boundaryBox.right - selectedBox.right);
            // } else if (selectedBox.left + dx < boundaryBox.left) { dx = (boundaryBox.left - selectedBox.left); } if
            //     (selectedBox.bottom + dy > boundaryBox.bottom) {
            //     dy = (boundaryBox.bottom - selectedBox.bottom);
            // }
            // else if (selectedBox.top + dy < boundaryBox.top) { dy = (boundaryBox.top - selectedBox.top); }
        } let
            currentMatrix = selected.transform.baseVal.consolidate().matrix, newMatrix = currentMatrix.translate(dx / scale, dy
                / scale), transform = svg.createSVGTransformFromMatrix(newMatrix);
        selected.transform.baseVal.initialize(transform); selected.dataset.startMouseX = dx + startX;
        selected.dataset.startMouseY = dy + startY;
    } function endDrag(e) {
        e.stopPropagation(); if (selected) {
            selected = undefined;
        }
    } 
    // function zoom(e) {
    //     e.stopPropagation(); e.preventDefault(); let delta = e.wheelDelta,
    //         container = document.querySelector('svg .main-container'), scaleStep = delta > 0 ? 1.25 : 0.8;

    //     if (scale * scaleStep > maxScale) {
    //         scaleStep = maxScale / scale;
    //     }

    //     if (scale * scaleStep < minScale) { scaleStep = minScale / scale; } scale *= scaleStep; let
    //         box = svg.getBoundingClientRect(); let point = svg.createSVGPoint(); point.x = e.clientX - box.left;
    //     point.y = e.clientY - box.top; let currentZoomMatrix = container.getCTM();
    //     point = point.matrixTransform(currentZoomMatrix.inverse()); let matrix = svg.createSVGMatrix()
    //         .translate(point.x, point.y).scale(scaleStep).translate(-point.x, -point.y); let
    //             newZoomMatrix = currentZoomMatrix.multiply(matrix);
    //     container.transform.baseVal.initialize(svg.createSVGTransformFromMatrix(newZoomMatrix));
    //     console.log("scale", scale); let t = newZoomMatrix; console.log("zoomMatrix", t.a, t.b, t.c, t.d, t.e, t.f);
    // }
    document.querySelector('svg .main-container').addEventListener('mousedown', beginDrag);
    // document.querySelector('svg .main-container').addEventListener('mousewheel', zoom);
    svg.addEventListener('mousemove', drag); window.addEventListener('mouseup', endDrag);
</script>