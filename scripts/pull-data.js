const readSheet = require('../google-sheet/read-sheet');
const { tableToJSON } = require('../transformers/table-to-json');
const save = require('../mongo/save');

const spreadsheetId = '1e-VcKnr8dwO-3uopD05UCTZpSj-Wrgehgr-l5RxrpTY';


(async () => {

    let [config, data] = await Promise.all([
        readSheet({ spreadsheetId, range: ['Pull_config!A:ZZ'] }),
        readSheet({ spreadsheetId, range: ['Pull!A:ZZ'] })
    ])

    config = tableToJSON({ headers: config.values.shift(), rows: config.values })[0]

    let headers = data.values.shift();
    headers = headers.map(header => {
        return header = {
            value: header,
            type: config[header] || 'string'
        }
    });

    let docs = tableToJSON({ headers, rows: data.values });

    docs.forEach(doc => {
        save({collection:'GSheet', document:doc })
        console.log(doc)
    });
    // // console.log(config, data);
    // console.log(test)



})()

module.exports;