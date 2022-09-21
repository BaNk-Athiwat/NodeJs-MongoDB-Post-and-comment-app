const express = require('express')
const router = express.Router()
const Posts = require('../module/dbPosts')
const Comments = require('../module/dbComments')

router.get('/', (req, res)=>{
    res.send("Hello World Jaaa")
})

router.get('/new', (req, res)=>{
    let title, content, author = ""
    let errorMessage = ""
    res.render('postnew', {errorMessage, values:{title, content, author}})
})

router.post('/new', async(req, res)=>{
    const {title, content, author, accepted} = req.body ?? {}
    try {
        //validation
        if(!title || !content || !author){
            throw new Error("no text")
        }
        else if(accepted != 'on'){
            throw new Error("no accepted")
        }

        //create post
        let ArrComment = []
        let Post = new Posts({
            title: title,
            content: content,
            author: author,
            ArrComment: ArrComment,
            createdAt: new Date().toLocaleString()
        })
        await Post.save(Post, error=>{
            if(error) console.log(error)
        })

    } catch (error) {
        console.error(error)
        let errorMessage = "น่าจะมีอะไรผิดพลาดซักอย่างนะ !?"
        if(error.message === "no text"){
            errorMessage = "กรุณากรอกข้อมูลให้ครบถ้วน"
        } else if(error.message === "no accepted"){
            errorMessage = "กรุณากดยอมรับด้วยสิ"
        }
        return res.render('postnew', {errorMessage, values:{title, content, author}})
    }
    res.redirect('/p/new/done')
})

router.get('/new/done', (req, res)=>{
    res.render('postnewdone')
})

router.get('/:postId', async(req, res)=>{
    const {postId} = req.params
    let {comment, comAuthor} = req.body ?? {}
    let Title = ""
    let onePost = null
    let postComments = []
    let errorMessage = ""
    try {
        // get one post to show
        onePost = await Posts.findOne({_id: postId})
        if(onePost){
            Title = onePost.title
        }else{
            Title = "ไม่พบเนื้อหา"
        }

        //get post comments to show
        postComments = await Comments.find({posid: postId}).sort({_id: -1})

    }catch(error) {
        console.error(error)
        errorMessage = "น่าจะมีอะไรผิดพลาดซักอย่างนะ !?"
    }
    res.render('postid', {onePost, Title, postComments, errorMessage, values:{comment, comAuthor}})
})

router.post('/:postId', async(req, res)=>{
    const {postId} = req.params
    let {comment, comAuthor, posTitle} = req.body ?? {}
    try {
        // validation
        if(!comment || !comAuthor){
            throw new Error("no comment or name !?")
        }else{
            // insert comment into DB
            let Comment = new Comments({
                posTitle: posTitle,
                posid: req.params.postId,
                comAuthor: comAuthor,
                comment: comment,
                createdAt: new Date().toLocaleString()
            })
            
            await Comment.save(Comment, error=>{
                if(error) console.log(error)
            })
            await Posts.findOneAndUpdate(
                {_id: req.params.postId},
                {$push: {ArrComment: {Comment}}},
            ).lean()
        }
        
    }catch(error){
        console.error(error)
        let errorMessage = "น่าจะมีอะไรผิดพลาดซักอย่างนะ !?1"
        if(error.message === "no comment or name !?"){
            errorMessage = "กรุณาเขียนคอมเมนต์และใส่ชื่อผู้เขียน"
        }
        // get one post
        let onePost = await Posts.findOne({_id: postId})
        let Title = onePost.title
        
        //get post comments to show
        let postComments = await Comments.find({posid: postId}).sort({_id: -1})
        return res.render('postid', {onePost, Title, postComments, errorMessage, values:{comment, comAuthor}})
    }
    res.redirect(`/p/${postId}`)
})

module.exports = router