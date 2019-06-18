const appendToSheet = require('../google-sheet/append-to-sheet');
const aggregate = require('../mongo/aggregate');
const { wait } = require('../functions/functions');

// Les données sont tirées de mongo puis envoyé dans google sheet

(async () => {
    const collection = 'comments';
    const aggregation = [{ $limit: 50 }]
    let comments = await aggregate({ collection, aggregation });

    for (let i = 0; i < comments.length; i++) {
        const { name, email, movie_id, text } = comments[i];
        console.log(name, email, movie_id, text);
        await wait(1000)
        // console.log(comment);
        appendToSheet({
            spreadsheetId: '1e-VcKnr8dwO-3uopD05UCTZpSj-Wrgehgr-l5RxrpTY',
            range: ['Push!A:ZZ'],
            values: [[name, email, movie_id, text]]
        })
    }



})();

module.exports;

