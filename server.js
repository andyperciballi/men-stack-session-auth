require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const morgan = require("morgan")
const method0verride = require("method-override")
const authRoutes = require("./controllers/auth")
const session =require('express-session')
const MongoStore =require('connect-mongo')

// Middlewares
require("./db/connection")
app.use(morgan("tiny"))
app.use(method0verride("_method"))
app.use(express.urlencoded({extended: true}))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
        maxAge: 1000 * 70 *10 *50
    }
  })
);


// Routes
app.get("/", (req, res)=>{
    res.render("index.ejs", {
        user: req.session.user
})
})

app.use("/auth", authRoutes)

//routes below this must be signed in - use this middleware
app.use((req, res, next )=> {
    if(req.session.user) {
        next()
    }else {
        res.redirect('/')
    }
})

app.get('/vip-lounge',(req, res) => {
    res.send(`Welcome to the party ${req.session.user.username}`)
})


app.listen(PORT, ()=>{
    console.log("This ship is sailing on port", PORT);
})