const readSheet = require('./read-sheet');
const { tableToJSON } = require('../transformers/table-to-json');

module.exports = ({ spreadsheetId, configRange, dataRange }) => {

    return new Promise(async (resolve, reject) => {
        let [config, data] = await Promise.all([
            readSheet({ spreadsheetId, range: configRange }),
            readSheet({ spreadsheetId, range: dataRange })
        ])
    
        config = tableToJSON({ headers: config.values.shift(), rows: config.values })[0]
    
        let headers = data.values.shift();
        headers = headers.map(header => {
            return header = {
                value: header,
                type: config[header] || 'string'
            }
        });
    
        let docs = tableToJSON({ headers, rows: data.values })
        resolve(docs)

    })




}


