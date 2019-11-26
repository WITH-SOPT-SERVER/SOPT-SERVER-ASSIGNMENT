const pool = require('../modules/db/pool');

const TABLE_NAME = 'comment';
module.exports = {
    readAll: async () => {
        const query = `SELECT * FROM ${TABLE_NAME}`;
        const result = await pool.queryParam_Parse(query);
        return result;
    },
    readByArticleIdx: async (articleIdx) => {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE articleIdx = ?`;
        const values = [articleIdx];
        const result = await pool.queryParam_Parse(query, values);
        return result;
    },
    readByIdx: async (commentIdx) => {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE commentIdx = ?`;
        const values = [commentIdx];
        const result = await pool.queryParam_Parse(query, values);
        return result;
    },
    readWhere: async (where) => {
        const query = `SELECT * FROM ${TABLE_NAME} `+
        where ? ' WHERE ' + Object.entries(where)
            .map(it => `${it[0]} = '${it[1]}'`)
            .join(' ') : '';
        const result = await pool.queryParam_None(query);
        return result;
    },
    create: async (json) => {
        const query = `INSERT ${TABLE_NAME}(${Object.keys(json).join(', ')}) ` + 
                    `VALUES(${Object.entries(json).map(it => it[1]).join(',')})`;
        const result = await pool.queryParam_None(query);
        return result;
    },
    update: async (commentIdx, json) => {
        const query = `UPDATE ${TABLE_NAME}`
            + ' SET ' + Object.entries(json).map(it => `${it[0]} = '${it[1]}'`).join(', ')
            + ` WHERE commentIdx = '${commentIdx}'`;
        const result = await pool.queryParam_None(query);
        return result;
    },
    delete: async (commentIdx) => {
        const query = `DELETE FROM ${TABLE_NAME} WHERE commentIdx = '${commentIdx}'`;
        const result = await pool.queryParam_None(query);
        return result;
    }
}