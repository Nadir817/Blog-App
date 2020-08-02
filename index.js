//Framework and library Import
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const flash = require('connect-flash')

//Controller Import
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const searchPostController = require('./controllers/searchPost')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logOutUserController = require('./controllers/logout')



//Custom middleware import
const validateMiddleware = require('./middlewares/validation')
const authMiddleware = require('./middlewares/auth')
const authedUserMiddleware = require('./middlewares/redirectAuthed')
//Initialize app
const app = new express()

//Global Variable
global.loggedIn = null




mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true, useUnifiedTopology: true })


app.use(expressSession({
    secret: 'keyboard cat'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(fileUpload())
app.use('/posts/store', validateMiddleware)
app.set('view engine', 'ejs')
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId
    next()
})
app.use(flash())


app.listen(4000, () => {
    console.log('App listening on port 4000');
})

app.get('/', homeController)

app.post('/', searchPostController);

app.get('/post/:id', getPostController)

app.get('/posts/new', authMiddleware, newPostController)

app.post('/posts/store', authMiddleware, storePostController)

app.get('/auth/register', authedUserMiddleware, newUserController)

app.post('/users/register', authedUserMiddleware, storeUserController)

app.get('/auth/login', authedUserMiddleware, loginController)

app.post('/users/login', authedUserMiddleware, loginUserController)

app.get('/auth/logout', logOutUserController)

app.use((req, res) => {
    res.render('notfound');
})
