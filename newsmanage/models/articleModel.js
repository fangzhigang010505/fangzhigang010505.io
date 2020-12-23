const mongoose = require('mongoose');

let ArticleSchema = new mongoose.Schema({
    title:String,
    author:String,
    source:String,
    content:String,
    createTime:String
});

let Article = mongoose.model('article',ArticleSchema);

module.exports = Article;