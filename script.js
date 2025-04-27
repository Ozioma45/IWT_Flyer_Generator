const originalWidth = 1000;
const originalHeight = 1000;
const flyerCanvas = new fabric.Canvas('flyerCanvas', {
  width: originalWidth,
  height: originalHeight,
  preserveObjectStacking: true
});

// Load background flyer
fabric.Image.fromURL('asset/test.png', function(img) {
  img.selectable = false;
  flyerCanvas.setBackgroundImage(img, flyerCanvas.renderAll.bind(flyerCanvas), {
    scaleX: flyerCanvas.width / img.width,
    scaleY: flyerCanvas.height / img.height
  });
});

// Create frame rectangles
const frameWidth = 330;
const frameHeight = 422;
const frameLeft = 627.5;
const frameTop = 219.5;
const borderThickness = 10;

// Outer frame
const frameOuter = new fabric.Rect({
  left: frameLeft - borderThickness/2,
  top: frameTop - borderThickness/2,
  width: frameWidth + borderThickness,
  height: frameHeight + borderThickness,
  fill: 'white',
  rx: 20 + borderThickness/2,
  ry: 20 + borderThickness/2,
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

// Handle Photo Upload
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

// Handle Name Input
const montserrat = new FontFaceObserver('Montserrat');
montserrat.load().then(() => {
  document.getElementById('nameInput').addEventListener('input', function(e) {
    const existingName = flyerCanvas.getObjects('textbox').find(obj => obj.id === 'userName');
    if (existingName) flyerCanvas.remove(existingName);

    const userName = new fabric.Textbox(e.target.value.toUpperCase(), {
      id: 'userName',
      left: frameLeft + (frameWidth/2),
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

// Responsive Scaling
function resizeCanvas() {
  const containerWidth = document.getElementById('canvas-container').clientWidth;
  const scale = containerWidth / originalWidth;

  flyerCanvas.setWidth(originalWidth * scale);
  flyerCanvas.setHeight(originalHeight * scale);
  flyerCanvas.setZoom(scale);
  flyerCanvas.renderAll();
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', resizeCanvas);

// Download flyer
function downloadFlyer() {
  // Reset Zoom
  flyerCanvas.setZoom(1);
  flyerCanvas.setWidth(originalWidth);
  flyerCanvas.setHeight(originalHeight);
  flyerCanvas.renderAll();

  const dataURL = flyerCanvas.toDataURL({
    format: 'png',
    multiplier: 2  // 2x for better quality
  });

  // Restore Zoom
  resizeCanvas();

  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'i-will-be-there.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
