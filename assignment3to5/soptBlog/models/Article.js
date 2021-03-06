const pool = require('../modules/db/pool');
const { NotMatchedError } = require('../errors');

const TABLE_NAME = 'article';
module.exports = {
    readAll: () => {
        const query = `SELECT * FROM ${TABLE_NAME}`;
        return pool.queryParam_Parse(query);
    },
    readByBlogIdx: (blogIdx) => {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE blogIdx = ?`;
        const values = [blogIdx];
        return pool.queryParam_Parse(query, values);
    },
    readByIdx: async (articleIdx) => {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE articleIdx = ?`;
        const values = [articleIdx];
        const result = await pool.queryParam_Parse(query, values);
        return result[0];
    },
    readWhere: (where) => {
        const entry = Object.entries(where).filter(it => it[1] != '*');
        const query = `SELECT * FROM ${TABLE_NAME} ` + 
            (entry.length > 0 ? ' WHERE ' + entry
                .filter(it => it[1] != '*')
                .map(it => `${it[0]} = '${it[1]}'`)
                .join(' ') : '');
        return pool.queryParam_None(query);
    },
    create: (json) => {
        const query = `INSERT ${TABLE_NAME}(${Object.keys(json).join(', ')}) VALUES(${Object.entries(json).map(_ => '?').join(',')})`;
        const values = Object.entries(json).map(it => it[1]);
        return pool.queryParam_Parse(query, values);
    },
    update: async (articleIdx, json) => {
        const query = `UPDATE ${TABLE_NAME}`
            + ' SET ' + Object.entries(json).map(it => `${it[0]} = '${it[1]}'`).join(', ')
            + ` WHERE articleIdx = '${articleIdx}'`;
        const result = await pool.queryParam_None(query);
        if(result.affectedRows == 0) throw new NotMatchedError();
        return result;
    },
    delete: async (articleIdx) => {
        const query = `DELETE FROM ${TABLE_NAME} WHERE articleIdx = '${articleIdx}'`;
        const result = await pool.queryParam_None(query);
        if(result.affectedRows == 0) throw new NotMatchedError();
        return result;
    }
}