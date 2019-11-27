const Article = require('../Article');
const Blog = require('../Blog');

module.exports = async () => {
    await Article.readAll();
    const blogIdx = (await Blog.readAll())[0].blogIdx;;
    const title = 'title test';
    const content = 'content test';
    const result = await Article.create({blogIdx, title, content});
    const articleIdx = result.insertId;
    await Article.readAll();
    await Article.update(articleIdx, {content: 'content update test'});
    await Article.delete(articleIdx);
    return true;
}