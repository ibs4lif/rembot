const dbAdress = 'localhost:27017/teo' //PROD
const mongojs = require("mongojs");

module.exports = mongojs(dbAdress, ['']);