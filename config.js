const fs = require('fs');
const path = require('path');

const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, '%add here you credentials file%'), 'utf8'));

module.exports = {
    google: {
        spreadsheetId: '?**add here your spreadsheet id**',
        credentials: credentials
    }
};
