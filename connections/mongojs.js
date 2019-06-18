const dbAdress = 'mongodb://ibrahima:b5lcOWRR7zYr4jX3@cluster0-shard-00-02-zl8ja.mongodb.net:27017,cluster0-shard-00-00-zl8ja.mongodb.net:27017,cluster0-shard-00-01-zl8ja.mongodb.net:27017/sample_mflix?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true' //PROD
const mongojs = require("mongojs");

module.exports = mongojs(dbAdress, ['']);