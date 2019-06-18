const google = require('googleapis');
const authentication = require('../google/authentication');


module.exports = ({
    spreadsheetId,
    range,
    values
}) => {
    return new Promise(async (resolve, reject) => {
        const auth = await authentication.authenticate();
        var sheets = google.sheets('v4');

        sheets.spreadsheets.values.update({
            auth, spreadsheetId, range,
            valueInputOption: "USER_ENTERED",
            resource: {
                values
            }
        }, (err, response) => {
            if (err) {
                reject(err);
                console.log(err);
                process.exit()
                return;
            } else {
                resolve(new Date());
            }
        });

    });
}