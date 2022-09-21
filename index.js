require('dotenv').config()
const express = require('express')
const path = require('path')
const generalRouter = require('./routers/general')
const postRouter = require('./routers/posts')

const app = express()
const port = process.env.APP_PORT

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: false}))
app.use('/static', express.static('static'))

// set the general and post Routers
app.use('/', generalRouter)
app.use('/p', postRouter)

app.listen(port, ()=>{
    console.log(`server start at http://localhost:${port}`)
})