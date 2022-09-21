const express = require('express')
const router = express.Router()
const Posts = require('../module/dbPosts')
const Comments = require('../module/dbComments')

router.get('/', async(req, res)=>{
    let allPost = null
    let allComment = null
    try {
        allPost = await Posts.find().sort({_id: -1})
        allComment = await Comments.find()
        res.render('home', {allPost, allComment})
    } catch (error) {
        console.error(error)
    }
    // Posts.find().sort({_id: -1}).exec((err, doc)=>{
    //     res.render('home', { doc })
    // })
})

module.exports = router


// try {
//     let data = new Posts({
//         title: 33231,
//         author: 44241
//     })
//     Posts.saveAsPos(data, (err)=>{
//         if(err) console.log(err)
//     })
// } catch (error) {
//     console.error(error)
// }