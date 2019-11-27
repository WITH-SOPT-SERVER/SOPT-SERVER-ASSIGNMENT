const Comment = require('../Comment');
const Article = require('../Article');

module.exports = async () => {
    await Comment.readAll();
    const articleIdx = (await Article.readAll())[0].articleIdx;
    const writer = 'writer test';
    const content = 'content test';
    const result = await Comment.create({articleIdx: articleIdx, writer, content});
    const commentIdx = result.insertId;
    await Comment.readAll();
    await Comment.update(commentIdx, {content: 'content update test'});
    await Comment.delete(commentIdx);
    return true;
}