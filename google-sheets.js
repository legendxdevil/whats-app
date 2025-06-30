const { google } = require('googleapis');
const config = require('./config');
const { GoogleAuth } = require('google-auth-library');

async function getGoogleSheets() {
    const auth = new GoogleAuth({
        credentials: config.google.credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });

    const sheets = google.sheets({ version: 'v4', auth });
    return sheets;
}

async function readSheetData(range) {
    const sheets = await getGoogleSheets();
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: config.google.spreadsheetId,
        range: range
    });
    return response.data.values;
}

async function writeSheetData(range, values) {
    const sheets = await getGoogleSheets();
    await sheets.spreadsheets.values.update({
        spreadsheetId: config.google.spreadsheetId,
        range: range,
        valueInputOption: 'RAW',
        resource: {
            values: values
        }
    });
}

async function appendSheetData(range, values) {
    const sheets = await getGoogleSheets();
    await sheets.spreadsheets.values.append({
        spreadsheetId: config.google.spreadsheetId,
        range: range,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: values
        }
    });
}

module.exports = {
    readSheetData,
    writeSheetData,
    appendSheetData
};
