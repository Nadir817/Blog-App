const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({ title: { $regex: req.body.search } })
    res.render('index', {
        blogposts
    })
}