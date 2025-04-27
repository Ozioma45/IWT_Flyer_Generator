# I Will Be There - Flyer Creator

Welcome to the official **"I Will Be There" Flyer Generator**!

This simple web app was built to help attendees of the **WORSHIP THE KING** musical concert (organized by the **Nation Builders Campus Fellowship (NABCAF)**, **NABCOTECH Chapter**) easily personalize and download their own event flyer — without needing manual editing by the design team.

---

## 📜 Project Purpose

The **"I Will Be There"** flyer was originally designed by the organizer.  
As requests for customized flyers grew larger and more time-consuming, this tool was created to **allow everyone to generate their own flyers instantly** by:

- Uploading their **passport photo**.
- Typing their **name**.
- **Adjusting** the placement if needed.
- **Downloading** a ready-to-use flyer image — perfect for social media sharing!

This saves hours of manual design work and gives everyone a beautiful, consistent flyer.

---

## 🛠️ How It Works

1. **Upload your passport photo** — it will automatically fit into the flyer frame.
2. **Type your name** — it appears neatly below the photo.
3. **Adjust** the image if needed (move inside the frame).
4. **Download** the final flyer in **high-quality** (1000 x 1000 pixels).

✅ **Fully responsive preview** (looks good on mobile and desktop).  
✅ **High resolution download** (good for Instagram, WhatsApp, etc).

---

## 🚀 Live Demo

You can try it here:  
**[Click Here ](https://ozioma45.github.io/IWT_Flyer_Generator/)** 

---

## 📂 Project Structure

```
📁 project-folder
├── 📄 index.html       # Main HTML page
├── 🎨 style.css         # Styling for the page
├── 🖋️ script.js         # Functionality using Fabric.js
├── 🖼️ assets/
│    └── flyer.png      # The official event flyer background
```

---

## 📦 Technologies Used

- **HTML5** — page structure.
- **CSS3** — styling and responsive layout.
- **JavaScript** — interactive functionality.
- **[Fabric.js](http://fabricjs.com/)** — advanced canvas manipulation (image uploads, zoom, positioning).

---

## ⚙️ Installation (for Developers)

If you want to run it locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/flyer-creator.git
   ```
2. Navigate into the project folder:
   ```bash
   cd flyer-creator
   ```
3. Open `index.html` directly in your browser.

✅ No extra installations needed — everything runs on the frontend!

---

## ✍️ Customization Guide

If you want to **use this system for other events** later:

- Replace the `assets/flyer.png` with your new background flyer.
- Update frame size/position in `script.js`:
  ```javascript
  const frameWidth = 270;
  const frameHeight = 270;
  const frameLeft = 610;
  const frameTop = 270;
  ```
- Adjust font size or colors if needed in `script.js` (inside the `fabric.Textbox`).

---

## 🙏 Special Thanks

This tool was developed by **Ozioma John Egole**,  
for the **WORSHIP THE KING** event, organized by **NABCAF NABCOTECH Chapter**.

**All glory to God!** 🎶👑

---

## 📜 License

This project is open for use within the NABCAF community.  
For wider use or commercial deployment, please request permission from the author.

``` 
