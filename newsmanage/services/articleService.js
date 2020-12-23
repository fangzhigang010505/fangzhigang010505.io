//定义文章操作的一些业务方法
const Article = require('../models/articleModel');
//定义保存的方法
module.exports = {
    selectAll : () => Article.find({}),
    save:       art => new Article(art).save(),
    deleteById: id=>Article.findByIdAndRemove(id),
    selectById: id=>Article.findById(id),
    updateById: (id,updates)=>Article.findByIdAndUpdate(id,updates)
}