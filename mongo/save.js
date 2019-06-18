const db = require('../connections/mongojs');

module.exports = ({ collection, document }) => {
    return new Promise(resolve => {
        db[collection].save(document, (err, doc) => {
            if (err) {
                console.log(err);
                resolve([]);
                return;
            }
            resolve(doc)
        });
    });

}
