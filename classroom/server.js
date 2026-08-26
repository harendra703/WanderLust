const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/posts.js");
const session = require("express-session");
const flash = require('connect-flash');
const path = require("path");

const sessionOptions = {
    secret: 'a4f8071f-c873-4447-8ee2',
    resave: false,
    saveUninitialized: true
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.errorMsg = req.flash("error");
    res.locals.successMsg = req.flash("success");
    next();
})


app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    if(name == "anonymous"){
        req.flash("error","User Not Registered");
    } else{
        req.flash("success", "User registerd sucessfully");
    }
    
    // console.log(req.session.name);
    res.redirect("/hello");
})

app.get("/hello", (req, res) => {    
    res.render("page.ejs", { name: req.session.name });
})

// app.get("/reqcount", (req, res) => {
//     if(req.session.count){
//         req.session.count ++;
//     } else {
//         req.session.count = 1;
//     }

//     res.send(`You sent request ${req.session.count} times`);
// })



app.listen("3000", () => {
    console.log("Server is listening on 3000");
})