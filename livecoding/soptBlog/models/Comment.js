const pool = require('../modules/db/pool');
const { NotMatchedError } = require('../errors');

const TABLE_NAME = 'comment';
module.exports = {
    readAll: () => {
        const query = `SELECT * FROM ${TABLE_NAME}`;
        return pool.queryParam_Parse(query);
    },
    readByArticleIdx: async (articleIdx) => {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE articleIdx = ?`;
        const values = [articleIdx];
        return pool.queryParam_Parse(query, values);
    },
    readByIdx: async (commentIdx) => {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE commentIdx = ?`;
        const values = [commentIdx];
        const result = await pool.queryParam_Parse(query, values);
        return result[0];
    },
    readWhere: async (where) => {
        const entry = Object.entries(where).filter(it => it[1] != '*');
        const query = `SELECT * FROM ${TABLE_NAME} ` + 
            (entry.length > 0 ? ' WHERE ' + entry
                .filter(it => it[1] != '*')
                .map(it => `${it[0]} = '${it[1]}'`)
                .join(' ') : '');
        return pool.queryParam_None(query);
    },
    create: (json) => {
        const query = `INSERT ${TABLE_NAME}(${Object.keys(json).join(', ')}) ` + 
                    'VALUES('+ Object.entries(json).map(it => `'${it[1]}'`).join(',') + ')';
        return pool.queryParam_None(query);
    },
    update: async (commentIdx, json) => {
        const query = `UPDATE ${TABLE_NAME}`
            + ' SET ' + Object.entries(json).map(it => `${it[0]} = '${it[1]}'`).join(', ')
            + ` WHERE commentIdx = '${commentIdx}'`;
        const result = await pool.queryParam_None(query);
        if(result.affectedRows == 0) throw new NotMatchedError();
        return result;
    },
    delete: async (commentIdx) => {
        const query = `DELETE FROM ${TABLE_NAME} WHERE commentIdx = '${commentIdx}'`;
        const result = await pool.queryParam_None(query);
        if(result.affectedRows == 0) throw new NotMatchedError();
        return result;
    }
}