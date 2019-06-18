const google = require('googleapis');
const authentication = require('../google/authentication');


module.exports = ({ spreadsheetId, range }) => {
    return new Promise(async resolve => {
        const auth = await authentication.authenticate();
        var sheets = google.sheets('v4');
        sheets.spreadsheets.values.clear({
            auth, spreadsheetId, range,

        }, (err, response) => {
            if (err) {
                resolve('Erreur');
                return;
            } else {
                resolve('Données effacées avec succès')
            }
        });


    });
}