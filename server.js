//Dependencies.//
const express=require("express");
const mongoose=require("mongoose");
const exphbs=require("express-handlebars");
const bodyParser= require("body-parser");
const routes=require("./routes");
let rawArticles;

//Express Boilerplate
const PORT=process.env.PORT || 3000;
const app=express();
app.use(express.static("public"));

//Handlebars Boilerplate
app.engine("handlebars",exphbs({defaultLayout:"main"}));
app.set("view engine","handlebars");

//Bodyparser Boilerplate
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(routes);

//Mongo Boilerplate
var MONGODB_URI=process.env.MONGODB_URI || "mongodb://127.0.0.1";

//"mongodb://docker-1.west-household.dns2go.com/mongoBBC"

mongoose.Promise=Promise;
mongoose.connect(MONGODB_URI);

//Listener
app.listen(PORT,function(){
    console.log("Running on port:"+PORT);
});