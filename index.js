// WhatsApp Auto Mass Message, Auto Reply, and Chat Capture Bot
// Uses whatsapp-web.js

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { readSheetData, writeSheetData, appendSheetData } = require('./google-sheets');
const figlet = require('figlet');
const chalk = require('chalk').default;

// Function to get formatted timestamp
function timestamp() {
    return new Date().toLocaleString();
}

// Display ASCII art banner
figlet('Bot  by  Nand Kisore Soni', (err, data) => {
    if (err) {
        console.log('Error:', err);
        return;
    }
    console.log(chalk.yellow(data));
    console.log(chalk.cyan('=== WhatsApp Bot ==='));
    console.log(chalk.green('Bot starting...'));
});

// ========== CONFIGURATION ==========
const SHEET_RANGE = 'Sheet1!A1:C'; // Range for numbers, messages, and replies
const CHAT_CAPTURE_NUMBERS = ['**Add your number here**', '**Add another number here**']; // Numbers to capture chat between
// Ensure these numbers are in international format without '+' sign, e.g., '919318489086'
// Example: ['919318489086', '919310365093']
const CHAT_LOG_FILE = 'chat_log.txt';
// ========== END CONFIGURATION ==========

async function loadConfigFromGoogleSheets() {
    try {
        const data = await readSheetData(SHEET_RANGE);
        const config = {
            numbers: [],
            message: '',
            reply: ''
        };

        if (data && data.length > 0) {
            // Skip header row
            for (let i = 1; i < data.length; i++) {
                const row = data[i];
                if (row[0]) config.numbers.push(String(row[0]));
                if (row[1]) config.message = String(row[1]);
                if (row[2]) config.reply = String(row[2]);
            }
        }

        return config;
    } catch (error) {
        console.error('Error loading config from Google Sheets:', error);
        return {
            numbers: ['919318489086', '919310365093'],
            message: 'Hello from my WhatsApp bot!',
            reply: 'Thank you for your message! This is an automated reply.'
        };
    }
}

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'whatsapp-bot'
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-first-run',
            '--no-zygote',
            '--single-process'
        ]
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Scan the QR code above with WhatsApp.');
});

client.on('ready', async () => {
    console.log(chalk.green('WhatsApp Bot is ready!'));
    console.log(chalk.cyan('=== Bot Status ==='));
    console.log(chalk.magenta('Time: ' + new Date().toLocaleString()));
    
    // Load configuration from Google Sheets
    const config = await loadConfigFromGoogleSheets();
    
    // Mass message sending
    config.numbers.forEach(async (number) => {
        const chatId = `${number}@c.us`;
        try {
            await client.sendMessage(chatId, config.message);
            console.log(chalk.yellow(`[${timestamp()}]`) + ' ' + chalk.green(`Message sent to ${number}`));
        } catch (err) {
            console.log(`Failed to send to ${number}:`, err.message);
        }
    });

    // Auto-reply
    client.on('message', async msg => {
        const from = msg.from.replace('@c.us', '');
        const to = msg.to ? msg.to.replace('@c.us', '') : null;
        
        try {
            await msg.reply(config.reply);
        } catch (err) {
            console.log('Auto-reply failed:', err.message);
        }

        // Chat capture between two numbers
        if (
            CHAT_CAPTURE_NUMBERS.length === 2 &&
            (CHAT_CAPTURE_NUMBERS.includes(from) || (to && CHAT_CAPTURE_NUMBERS.includes(to)))
        ) {
            const logEntry = `[${new Date().toLocaleString()}] ${from} -> ${to || 'me'}: ${msg.body}\n`;
            fs.appendFileSync(CHAT_LOG_FILE, logEntry);
        }
    });
});

client.initialize();
