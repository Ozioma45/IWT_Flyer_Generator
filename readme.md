# I Will Be There - Flyer Creator

Welcome to the official **"I Will Be There" Flyer Generator**! 🎉

This web app was built to help attendees of the **WORSHIP THE KING** musical concert (organized by the **Nation Builders Campus Fellowship (NABCAF)**, **NABCOTECH Chapter**) easily personalize, download, and share their own event flyers — without needing manual editing by the design team.

---

## 📜 Project Purpose

The **"I Will Be There"** flyer was originally designed by the organizers.  
As requests for personalized flyers grew larger and more time-consuming, this tool was created to **allow everyone to generate their own flyers instantly** by:

- Uploading their **passport photo**.
- Typing their **name**.
- **Adjusting** image placement if needed.
- **Previewing** the final flyer.
- **Downloading** or **sharing** their customized flyer immediately.

This saves hours of manual design work and gives everyone a beautiful, consistent flyer to promote the event on social media.

---

## 🛠️ How It Works

1. **Upload your passport photo** — it automatically fits into the flyer frame.
2. **Type your name** — it appears neatly in the designated space.
3. **Adjust your photo** inside the frame if needed.
4. **Preview your flyer** before downloading.
5. **Download** or **Share** your finished flyer with one click!
6. **Celebrate** with a special popup and sound effect after download!

✅ **Fully responsive design** (works on mobile, tablet, and desktop).  
✅ **High-resolution flyer** (perfect for Instagram, WhatsApp, Facebook, etc).  
✅ **Simple video tutorial** available for first-time users.  
✅ **Invitation link popup** for inviting more friends easily.

---

## 🚀 Live Demo

You can try it here:  
👉 **[Launch Flyer Creator](https://iwt-flyer-generator.vercel.app/)**

---

## 🎬 Features Overview

- 🎨 **Personalize Flyers** with your photo and name.
- 👀 **Flyer Preview** before downloading.
- 📷 **Upload Passport Photos** easily.
- 🎉 **Popup Celebration** with sound and confetti after download.
- 🔗 **Quick Share** button to spread your flyer fast.
- 🎥 **Video Guide** to help users learn how to use the tool.
- 📩 **Invitation Popup** — share a special link to invite more people.
- ⬇ **Main Official Flyer Download** also available.

---

## 📂 Project Structure

```
📁 project-folder
├── 📄 index.html         # Main HTML page
├── 🎨 style.css           # Styling and layout
├── 🖋️ script.js           # Functionality with Fabric.js and custom logic
├── 🖼️ asset/
│    ├── logo.png         # NABCAF/Worship the King logo
│    ├── back.jpg         # Official flyer background
│    └── sound-effect.mp3 # Applause sound effect
```

---

## 📦 Technologies Used

- **HTML5** — page structure.
- **CSS3** — styling and responsive layouts.
- **JavaScript (Vanilla)** — interactivity and user actions.
- **[Fabric.js](http://fabricjs.com/)** — advanced canvas image manipulation.
- **Canvas-Confetti** — lightweight confetti animation.
- **FontFaceObserver** — ensures custom fonts load correctly before canvas rendering.

---

## ⚙️ Installation (for Developers)

If you want to run or customize it locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/flyer-creator.git
   ```
2. Navigate into the project folder:
   ```bash
   cd flyer-creator
   ```
3. Open `index.html` directly in your browser.

✅ No extra installations needed — everything is client-side!

---

## ✍️ Customization Guide

If you want to **reuse this system for another event** later:

- **Replace** the `asset/back.jpg` background image.
- **Update** the frame size and positioning inside `script.js`:
  ```javascript
  const frameWidth = 270;
  const frameHeight = 270;
  const frameLeft = 610;
  const frameTop = 270;
  ```
- **Change** the font size, colors, or text styles inside `script.js` (`fabric.Textbox`).
- **Update** the invitation link inside the popup (`inviteLink` input).
- **Customize** the video tutorial URL if needed.
- **Edit** the download sound effect in the assets folder.

---

## 🙏 Special Thanks

Developed by **Ozioma John Egole**  
for the **WORSHIP THE KING** event, proudly organized by the **NABCAF NABCOTECH Chapter**.

**All glory to God!** 🎶👑

---

## 📜 License

This project is free to use within the NABCAF community.  
For wider use, customization, or commercial purposes, please request permission from the author.

---
```