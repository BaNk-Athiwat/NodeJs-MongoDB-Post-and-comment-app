// use mongoose
const { Timestamp, Int32 } = require('mongodb')
const mongoose = require('mongoose')

// connect mangoDB
const dbUrl = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`
mongoose.connect(dbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=>console.log(err))

// schema design
let postSchema = mongoose.Schema({
    title: String,
    content: String,
    author: String,
    createdAt: String,
    ArrComment: Array
})

// create model
let Posts = mongoose.model("posts", postSchema)

// export model
module.exports = Posts

// save function
module.exports.saveAsPos = function(model, data){
    console.log("save as post success !!")
    model.save(data)
}