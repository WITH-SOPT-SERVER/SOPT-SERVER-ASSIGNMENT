const pool = require('../modules/db/pool');
const { NotMatchedError } = require('../errors');

const TABLE_NAME = 'blog';
module.exports = {
    readAll: () => {
        const query = `SELECT * FROM ${TABLE_NAME}`;
        return pool.queryParam_Parse(query);
    },
    readByIdx: (blogIdx) => {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE blogIdx = ?`;
        const values = [blogIdx];
        return pool.queryParam_Parse(query, values);
    },
    readWhere: (where) => {
        const query = `SELECT * FROM ${TABLE_NAME} `+
        where ? ' WHERE ' + Object.entries(where)
            .map(it => `${it[0]} = '${it[1]}'`)
            .join(' ') : '';
        return pool.queryParam_None(query);
    },
    create: (json) => {
        const query = `INSERT ${TABLE_NAME}(${Object.keys(json).join(', ')}) VALUES(?, ?)`;
        const values = Object.entries(json).map(it => it[1]);
        return pool.queryParam_Parse(query, values);
    },
    update: async (blogIdx, json) => {
        const query = `UPDATE ${TABLE_NAME}`
            + ' SET ' + Object.entries(json).map(it => `${it[0]} = '${it[1]}'`).join(', ')
            + ` WHERE blogIdx = '${blogIdx}'`;
        const result = await pool.queryParam_None(query);
        if(result.affectedRows == 0) throw new NotMatchedError();
        return result;
    },
    delete: async (blogIdx) => {
        const query = `DELETE FROM ${TABLE_NAME} WHERE blogIdx = '${blogIdx}'`;
        const result = await pool.queryParam_None(query);
        if(result.affectedRows == 0) throw new NotMatchedError();
        return result;
    }
}