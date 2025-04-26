const passportInput = document.getElementById('passportInput');
const nameInput = document.getElementById('nameInput');
const flyerCanvas = document.getElementById('flyerCanvas');
const ctx = flyerCanvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

let flyerImage = new Image();
flyerImage.src = 'assets/flyer.png';  // load your flyer

let passportImage = null;

flyerImage.onload = () => {
    drawFlyer();
};

passportInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            passportImage = new Image();
            passportImage.onload = drawFlyer;
            passportImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

nameInput.addEventListener('input', drawFlyer);

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'iwillbethere.png';
    link.href = flyerCanvas.toDataURL();
    link.click();
});

function drawFlyer() {
    ctx.clearRect(0, 0, flyerCanvas.width, flyerCanvas.height);

    // Draw the flyer background
    ctx.drawImage(flyerImage, 0, 0, flyerCanvas.width, flyerCanvas.height);

    if (passportImage) {
        // Draw the passport image (position it nicely)
        ctx.drawImage(passportImage, 300, 150, 200, 200); // You can adjust x, y, width, height
    }

    if (nameInput.value.trim() !== '') {
        ctx.font = "40px Arial";
        ctx.fillStyle = "#ffffff"; // white text
        ctx.textAlign = "center";
        ctx.fillText(nameInput.value, flyerCanvas.width / 2, 400); // Adjust y position
    }
}
