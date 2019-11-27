const Blog = require('../Blog');

module.exports = async () => {
    await Blog.readAll();
    const name = 'name test';
    const host = 'host test';
    const result = await Blog.create({name, host});
    const blogIdx = result.insertId;
    await Blog.readAll();
    await Blog.update(blogIdx, {name: 'name update test'});
    await Blog.delete(blogIdx);
    return true;
}