var express = require('express');
var router = express.Router();
var articleService = require('../services/articleService');

/* GET users listing. */
// /api/articles
router.post('/articles', function(req, res, next) {
  let {title,author,source,content} = req.body;
  articleService.save({title,author,source,content,createTime : new Date().toLocaleDateString()})
  .then((data)=>{ // 成功
    res.json({msg:'文章发布成功'});
  }).catch((err)=>{ // 失败
    res.json({msg:'文章发布失败'});
  })
});

router.get('/articles',function(req,res,next) {
    articleService.selectAll()
    .then(data=>{
      // console.log(data);
      res.render('articles/list',{articles:data});
    }).catch(err=>{
      throw err;
    })
});

router.delete('/articles/:id',function(req,res,next) {
  articleService.deleteById(req.params.id)
  .then(data=>{
    res.json({msg:'文章删除成功'});
  }).catch(err=>{
    res.json({msg:'文章删除失败'});
  })
})

router.get('/articles/:id',function(req,res,next) {
  articleService.selectById(req.params.id)
  .then(data=>{
    res.json({data});
  }).catch(err=>{
    throw err;
  })
})

router.put('/articles/:id',function(req,res,next) {
  let id = req.params.id;
  let {title,author,source,content,createTime} = req.body;
  let updates = articleService.save({title,author,source,content,createTime});
  // console.log(id);
  // console.log(updates);
  
  articleService.updateById(id,updates)
  .then(data=>{
    res.json({msg:'文章修改成功'});
  }).catch(err=>{
    res.json({msg:'文章修改失败'});
  })
})

module.exports = router;
