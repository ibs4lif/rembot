const _ = require('lodash');
const hasHeaders = require('../google-sheet/has-headers');
const postToSheet = require('../google-sheet/post-to-sheet');
const clearSheet = require('../google-sheet/clear-sheet');



module.exports = async ({ docs, spreadsheetId, headers }) =>{

        // let headers = await hasHeaders({ spreadsheetId });
        let rows = [];

        function createRow (headers,doc){
            let row = [];
            for (const header of headers) {
                row.push(doc[header]);
            }
            return row;
        }

        if (headers) {
            for (const doc of docs) {
                rows.push(createRow(headers,doc));
            }    
        }else{
            headers = [];
            for (const doc of docs) {
                headers = _.union(headers, _.keys(doc))
            }
            for (const doc of docs) {
                rows.push(createRow(headers, doc));
            }  
        }
        
        rows.unshift(headers)
        return rows


};