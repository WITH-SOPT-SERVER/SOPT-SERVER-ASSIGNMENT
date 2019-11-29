const mysql = require('promise-mysql')

const dbConfig = {
    host: 'Database host ip address',
    port: 3306,
    user: 'db user name',
    password: 'db password',
    database: 'database(schema) name',
    dateStrings: 'date',
}
module.exports = mysql.createPool(dbConfig)
