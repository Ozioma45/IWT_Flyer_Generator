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
      img.id = 'userPhoto';
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

// Undo
function undoChanges() {
  const objs = flyerCanvas.getObjects();
  objs.forEach(obj => {
      if (obj.id === 'userPhoto' || obj.id === 'userName') {
          flyerCanvas.remove(obj);
      }
  });
  flyerCanvas.renderAll();
}



// Download flyer
function downloadFlyer() {

  if (!hasShared) {
    Swal.fire({
      icon: 'warning',
      title: 'Hold on! 🙏',
      text: 'Please share the Link first before downloading. Just click the share button',
      confirmButtonText: 'Got it!'
    });
    return;
  }
  

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

  
  // Show popup after download
  showInvitePopup();
}

// Preview
function previewFlyer() {
  const dataURL = flyerCanvas.toDataURL({ format: 'png', multiplier: 1 });
  const win = window.open();
  win.document.write('<iframe src="' + dataURL + '" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>');
}


let hasShared = false;
// Share
async function shareFlyer() {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Get Your "I Will Be There" Flyer!',
        text: '🎉 Create your flyer in 5 seconds and show everyone you\'ll be there!',
        url: 'https://iwt-flyer-generator.vercel.app/'
      });
      hasShared = true; // <-- NEW: Mark that sharing was successful
      Swal.fire({
        icon: 'success',
        title: 'Thank you for sharing! 🎉',
        text: 'You can now download your flyer.',
        confirmButtonText: 'Awesome!'
      });
      
      //showInvitePopup();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Sharing failed',
        text: error.message,
        confirmButtonText: 'Okay'
      });
      
    }
  } else {
    window.open('https://iwt-flyer-generator.vercel.app/', '_blank');
  }
}



// Main Flyer Download
function downloadMainFlyer() {
  const img = document.getElementById('mainFlyerImage');
  const link = document.createElement('a');
  link.href = img.src;
  link.download = 'main-flyer.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Show popup after download
  showInvitePopup();
}

// Main Flyer Share
async function shareMainFlyer() {
  const imgSrc = document.getElementById('mainFlyerImage').src;

  if (navigator.canShare && navigator.canShare({ files: [new File([], '')] })) {
      try {
          const response = await fetch(imgSrc);
          const blob = await response.blob();
          const file = new File([blob], 'main-flyer.png', { type: blob.type });
          await navigator.share({
              files: [file],
               title: 'I Will Be There! (Main Flyer)',
        text: `🎉 Join us!\n\nCreate your own flyer here:\nhttps://iwt-flyer-generator.vercel.app/`
          });
          showInvitePopup();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Sharing failed',
          text: error.message,
          confirmButtonText: 'Okay'
        });
        
      }
  } else {
      // Fallback: open the main flyer in a new tab
      const newTab = window.open();
      if (newTab) {
          newTab.document.body.innerHTML = `<img src="${imgSrc}" style="width:100%;height:auto;" alt="Main Flyer"/>`;
      } else {
          alert('Please allow popups to view the flyer.');
      }
  }
}

function showInvitePopup() {
  document.getElementById('invitePopup').style.display = 'flex';

  // Play the sound
  const sound = document.getElementById('celebrationSound');
  sound.currentTime = 0; // Rewind to start
  sound.play();

  // Launch confetti
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });

  // Optionally, keep shooting confetti every few milliseconds for more celebration
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 }
    });
  }, 500);
}


function closePopup() {
  document.getElementById('invitePopup').style.display = 'none';
}

function copyInviteLink() {
  const copyText = document.getElementById('inviteLink');
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(copyText.value)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Link copied!',
        text: 'Share it with others 🙌',
        confirmButtonText: 'Will do!'
      });
      
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Copy failed',
        text: err,
        confirmButtonText: 'Okay'
      });
      
    });
}
