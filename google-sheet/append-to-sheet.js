const google = require('googleapis');
const authentication = require('../google/authentication');


module.exports = ({
    spreadsheetId, // eg. '1e-VcKnr8dwO-3uopD05UCTZpSj-Wrgehgr-l5RxrpTY'
    range, // eg. ['Data!A:ZZ']
    values // eg. [[1,2,3],[1,2,3]]
}) => {
    return new Promise(async (resolve, reject) => {
        const auth = await authentication.authenticate();
        var sheets = google.sheets('v4');

        sheets.spreadsheets.values.append({
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