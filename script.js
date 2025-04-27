

const originalWidth = 1000;
const originalHeight = 1000;
const displayWidth = 400;
const displayHeight = 400;

const flyerCanvas = new fabric.Canvas('flyerCanvas', {
    width: originalWidth,
    height: originalHeight,
    preserveObjectStacking: true
});

// Scale canvas for display only
const scaleFactor = displayWidth / originalWidth;
flyerCanvas.setZoom(scaleFactor);

// Important: do not change internal width/height here, only zoom for display.

// Load the flyer background
fabric.Image.fromURL('asset/test.png', function(img) {
    img.selectable = false;
    flyerCanvas.setBackgroundImage(img, flyerCanvas.renderAll.bind(flyerCanvas), {
        scaleX: flyerCanvas.width / img.width,
        scaleY: flyerCanvas.height / img.height
    });
});

// Draw the white photo frame using two rectangles
const frameWidth = 330;
const frameHeight = 422;
const frameLeft = 627.5;
const frameTop = 219.5;
const borderThickness = 10;

// Outer white border
const frameOuter = new fabric.Rect({
    left: frameLeft - borderThickness/2,
    top: frameTop - borderThickness/2,
    width: frameWidth + borderThickness,
    height: frameHeight + borderThickness,
    fill: 'white',
    rx: 20 + (borderThickness/2),
    ry: 20 + (borderThickness/2),
    selectable: false
});

// Inner black frame
const frameInner = new fabric.Rect({
    left: frameLeft,
    top: frameTop,
    width: frameWidth,
    height: frameHeight,
    fill: 'black',
    rx: 20,
    ry: 20,
    selectable: false
});

flyerCanvas.add(frameOuter);
flyerCanvas.add(frameInner);

// Upload passport photo
document.getElementById('photoUpload').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(f) {
        fabric.Image.fromURL(f.target.result, function(img) {
            img.scaleToWidth(frameWidth);
            img.scaleToHeight(frameHeight);
            img.left = frameLeft;
            img.top = frameTop;
            img.clipPath = new fabric.Rect({
                left: frameLeft,
                top: frameTop,
                width: frameWidth,
                height: frameHeight,
                rx: 20,
                ry: 20,
                absolutePositioned: true
            });
            flyerCanvas.add(img);
            flyerCanvas.setActiveObject(img);
            flyerCanvas.renderAll();
        });
    }
    reader.readAsDataURL(e.target.files[0]);
});

// Type user name
const montserrat = new FontFaceObserver('Montserrat');

montserrat.load().then(function () {
    document.getElementById('nameInput').addEventListener('input', function(e) {
        const existingName = flyerCanvas.getObjects('text').find(obj => obj.id === 'userName');
        if (existingName) flyerCanvas.remove(existingName);

        const userName = new fabric.Textbox(e.target.value.toUpperCase(), {
            id: 'userName',
            left: frameLeft + (frameWidth / 2),
            top: frameTop + frameHeight + 5,
            width: frameWidth + 20,
            fontSize: 28,
            fontWeight: 'bold',
            fontFamily: 'Montserrat',
            fill: 'black',
            backgroundColor: 'white',
            textAlign: 'center',
            padding: 90,
            originX: 'center',
            selectable: false, 
        });

        flyerCanvas.add(userName);
        flyerCanvas.renderAll();
    });
});


// Download the final flyer
function downloadFlyer() {
    flyerCanvas.setZoom(1); // Reset zoom before export
    flyerCanvas.renderAll();

    const dataURL = flyerCanvas.toDataURL({
        format: 'png',
        multiplier: 1 // Full size
    });

    flyerCanvas.setZoom(scaleFactor); // Restore zoom after export
    flyerCanvas.renderAll();

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'i-will-be-there.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
