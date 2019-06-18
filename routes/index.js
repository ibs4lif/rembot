const express = require('express');
const router = express.Router();


const postToSheet = require('../google-sheet/post-to-sheet');
const clearSheet = require('../google-sheet/clear-sheet');
const readSheet = require('../google-sheet/read-sheet');
const hasHeaders = require('../google-sheet/has-headers');
const exportSheet = require('../google-sheet/export-sheet');

const aggregate = require('../mongo/aggregate');
const save = require('../mongo/save');


const tableToJson = require('../transformers/table-to-json');
const jsonToTable = require('../transformers/json-to-table');

// require('../scripts/update-loop');
require('../scripts/pull-data');


router.get('/test', (req, res) => {
  res.json('test')
});


router.post('/post_data', async (req, res) => {
  const { spreadsheetId, configRange, dataRange, clearRange, collection } = req.body;

  let docs = await exportSheet({ spreadsheetId, configRange, dataRange })

  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    await save({ collection, document: doc })
  }

  if (clearRange) {
    //efface les données de la zone clearRange
    await clearSheet({ spreadsheetId, range: clearRange })
  }

  res.status(200).send('Done')


});



router.post('/get_data', async (req, res) => {

  let { spreadsheetId, range, collection, aggregation } = req.body;

  if (typeof aggregation == 'string') {
    aggregation = JSON.parse(aggregation)
  }

  let data = await aggregate({ collection, aggregation })

  let values = await jsonToTable({
    docs: data,
    spreadsheetId,
    headers: ['Titre', 'Date', 'Votes', 'Note']
  });

  await clearSheet({ spreadsheetId, range })
  await postToSheet({ spreadsheetId, range, values })

  res.status(200).send();

});

// postToSheet({
//   spreadsheetId: '1AXFWqRfixoThEwhdus2gW5Ysj3oxIVgGvEvOc4lK9k0',
//   range:'test!A:ZZ',
//   values:[[1,2,3],[1,2,3]]
// }).then(result => {
//   console.log(result)
// });

// clearSheet({
//   spreadsheetId: '1AXFWqRfixoThEwhdus2gW5Ysj3oxIVgGvEvOc4lK9k0',
//   range:'test!A:ZZ',
// }).then(result => {
//   console.log(result)
// });

// hasHeaders({
//   spreadsheetId: '1AXFWqRfixoThEwhdus2gW5Ysj3oxIVgGvEvOc4lK9k0',
// }).then(result => {
//   console.log(result)
// });

// (async (params) => {
//   const spreadsheetId = '1AXFWqRfixoThEwhdus2gW5Ysj3oxIVgGvEvOc4lK9k0';
//   let docs = await aggregate({collection:'accident', aggregation:[]})
//   const table = await jsonToTable({ docs, spreadsheetId});
//   await clearSheet({ spreadsheetId, range: 'test!A:ZZ' });
//   await postToSheet({ spreadsheetId, range: 'test!A1:ZZ', values: table.headers });
//   await postToSheet({ spreadsheetId, range: 'test!A2:ZZ', values: table.rows });
// })()



module.exports = router;
