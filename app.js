var express= require("express");
var app=express();
var bodyparser= require("body-parser");
//This so we can access body variables 
app.use(bodyparser.urlencoded({extended:true}));
//This so we can search for css in /public
app.use(express.static("public"));
//This to see ejs without having to say file.ejs
app.set("view engine","ejs");

var request=require("request");

app.get("/",function(req, res) {
   res.render("home") ;
});

app.get("/results",function(req,res){
    var movieName = req.query.movName;
    var url="http://www.omdbapi.com/?s="+movieName+"&apikey=thewdb";
    request(url,function(error,response,body){
        if(!error&&response.statusCode==200){
            var vr= JSON.parse(body);
            res.render("results",{body:vr,name:movieName});
        }
    })
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("server started rawr xD"); 
});