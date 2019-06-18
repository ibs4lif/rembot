const readSheet = require('./read-sheet');
const { tableToJSON } = require('../transformers/table-to-json');

module.exports = ({ spreadsheetId }) => {

    return new Promise ( async resolve => {

        let config = await readSheet({ spreadsheetId, range: ['__CONFIG__!A:ZZ'] });
    
        config.values ? resolve(config.values.shift()) : resolve(false)
    });

}