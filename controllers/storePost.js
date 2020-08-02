const path = require('path');
const BlogPost = require('../models/BlogPost');

module.exports = (req, res) => {
    let img = req.files.image;
    img.mv(path.resolve(__dirname, 'public/img', img.name), async (error) => {
        await BlogPost.create({ ...req.body, image: '/img/' + img.name, userid: req.session.userId })
        res.redirect('/')
    })
}