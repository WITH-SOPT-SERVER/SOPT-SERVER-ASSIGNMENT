const pool = require('../modules/db/pool');
const { NotMatchedError } = require('../errors')

const TABLE_NAME = 'comment';
module.exports = {
    readAll: async () => {
        const query = `SELECT * FROM ${TABLE_NAME}`;
        return await pool.queryParam_Parse(query);
    },
    readByArticleIdx: async (articleIdx) => {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE articleIdx = ?`;
        const values = [articleIdx];
        return pool.queryParam_Parse(query, values);
    },
    readByIdx: async (commentIdx) => {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE commentIdx = ?`;
        const values = [commentIdx];
        return pool.queryParam_Parse(query, values);
    },
    readWhere: async (where) => {
        const query = `SELECT * FROM ${TABLE_NAME} `+
        where ? ' WHERE ' + Object.entries(where)
            .map(it => `${it[0]} = '${it[1]}'`)
            .join(' ') : '';
        return pool.queryParam_None(query);
    },
    create: (json) => {
        const query = `INSERT ${TABLE_NAME}(${Object.keys(json).join(', ')}) ` + 
                    `VALUES(${Object.entries(json).map(it => it[1]).join(',')})`;
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