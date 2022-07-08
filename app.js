const epxress=require('express')
const app=epxress()
const connectDB=require('./config/db')
const morgan=require('morgan')
const hbs=require('express-handlebars')
const path=require('path')
const session=require('express-session')
const passport=require('passport')
const { engine } = require('express-handlebars');

const {formatDate,stripTags,truncate}=require('./helpers/helper')
require('dotenv').config({
    path:"./config/config.env"
})
require('./config/passport.js')(passport)

// connecting to DB
connectDB()

//body parser
app.use(epxress.urlencoded({extended:false}))
app.use(epxress.json())

// using the morgan to log the outputs
app.use(morgan('dev'))
app.use(session({
      secret: 'NewSession',
      resave: false,
      saveUninitialized: false,

}))
//passport
app.use(passport.initialize())
app.use(passport.session())

//setting up the template and layout for hbs
app.engine('hbs', engine({helpers:{formatDate,stripTags,truncate}, extname: '.hbs', defaultLayout: "main"}))
app.set('view engine','hbs')
app.set("views", "./views");

// applying the public static

app.use(epxress.static(path.join(__dirname,'public')))

app.use("/",require('./routes/index'))
app.use("/auth",require('./routes/auth'))
app.use("/stories",require("./routes/stories"))

app.listen(process.env.PORT || 5000,()=>{
    console.log(`the environment mode is ${[process.env.NODE_ENV]} and listening on ${process.env.PORT}`)
})