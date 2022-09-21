// use mongoose
const mongoose = require('mongoose')

// connect mangoDB
const dbUrl = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`
mongoose.connect(dbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=>console.log(err))

// schema design
let commentSchema = mongoose.Schema({
    posid: String,
    comAuthor: String,
    comment: String,
    createdAt: String,
})

// create model
let Comments = mongoose.model("comments", commentSchema)

// export model
module.exports = Comments

// save function
module.exports.saveAsCom = function(model, data){
    console.log("save as comment success !!")
    model.save(data)
}