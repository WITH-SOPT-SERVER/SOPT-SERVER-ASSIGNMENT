const ArticleTest = require('./Blog.test');
const BlogTest = require('./Article.test');
const CommentTest = require('./Comment.test');

(async () => {
    const result1 = await BlogTest();
    console.log('Blog Test ', result1)
    const result2 = await ArticleTest();
    console.log('Article Test ', result2)
    const result3 = await CommentTest();
    console.log('Comment Test ', result3)
})();

