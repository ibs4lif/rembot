const db = require('../connections/mongojs');

module.exports = ({ collection, aggregation }) => {
    return new Promise(resolve => {
        db[collection].aggregate(aggregation, (err, doc) => {
            if (err) {
                console.log(err);
                resolve([]);
                return;
            }
            resolve(doc)
        });
    });

}
