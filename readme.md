<!-- PROJECT BANNER -->
<p align="center">
  <img src="https://img.icons8.com/color/96/000000/whatsapp.png" alt="WhatsApp Bot Logo" width="120"/>
</p>

<h1 align="center">🤖 WhatsApp.js Bot</h1>

<p align="center">
  <b>Powerful & Easy WhatsApp Bot built with <a href="https://github.com/pedroslopez/whatsapp-web.js">whatsapp.js</a></b><br>
  <i>Automate your WhatsApp with style!</i>
</p>

<p align="center">
  <a href="#features"><img src="https://img.shields.io/badge/Features-8-green?style=for-the-badge"/></a>
  <a href="#quick-start"><img src="https://img.shields.io/badge/Quick%20Start-Easy-blue?style=for-the-badge"/></a>
  <a href="#license"><img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge"/></a>
  <a href="https://github.com/legendxdevil"><img src="https://img.shields.io/badge/Made%20by-Nand%20Kishore%20Soni-16a34a?style=for-the-badge"/></a>
</p>

---

## 🚀 Features

- 📤 Send mass messages to numbers from Google Sheets
- 📥 Auto-reply to all incoming messages
- 📝 Capture and log chat between two specified numbers
- ⚙️ Easy configuration via Google Sheets
- 🗂️ Google Sheets integration for dynamic contact/message management

---

## ⚡ Quick Start

```bash
# 1. Clone the repo or copy the project folder
$ git clone https://github.com/legendxdevil/whats-app.git
$ cd whats-app

# 2. Install dependencies
$ npm install

# 3. Add your Google API credentials (see below)

# 4. Update config.js with your credentials file name and spreadsheet ID

# 5. Start the bot
$ npm start
```

When you run for the first time, a QR code will appear in your terminal. Scan it with WhatsApp to connect your bot!

---

## 🛠️ How it Works

- The bot reads numbers, messages, and replies from your configured Google Sheet.
- On startup, it sends the message to all numbers listed in the sheet.
- It auto-replies to all incoming messages with the reply text from the sheet.
- If you specify two numbers in `CHAT_CAPTURE_NUMBERS` in `index.js`, it will log chats between them to `chat_log.txt`.

To customize, edit your Google Sheet or modify the code as needed.

---

## ⚙️ Configuration & Google Sheets Setup

1. **Google API Credentials**
   - Download your Google service account credentials JSON from Google Cloud Console.
   - Save it as (for example) `credentials file.json` in the project root.

2. **Google Sheets**
   - Create a Google Sheet with columns for numbers, message, and reply (e.g., `Sheet1!A1:C`).
   - Share the sheet with your service account email.
   - Copy the spreadsheet ID from the URL.

3. **config.js**
   - Update the credentials file name and spreadsheet ID:
     ```js
     const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials file.json'), 'utf8'));
     ...
     spreadsheetId: 'your_spreadsheet_id',
     ```
   - Optionally, update `CHAT_CAPTURE_NUMBERS` in `index.js` to log chats between two numbers.

4. **Run the Bot**
   - Start with `npm start`.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Contact & Support

- **Author:** [Nand Kishore Soni](https://in.linkedin.com/in/nand-kishore-soni-036783317)
- **GitHub:** [legendxdevil](https://github.com/legendxdevil)
- **Issues:** [Open an issue](https://github.com/legendxdevil/whatsapp-bot/issues)

---

<p align="center">
  <img src="https://img.shields.io/github/stars/legendxdevil/whatsapp-bot?style=social" alt="GitHub stars"/>
  <br>
  <b>⭐ Star this repo if you like it!</b>
</p>
