
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.post("/",function(req,res){
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FName: fname,
          LName: lname
        }
      }
    ]
  }
  const jsonData = JSON.stringify(data);

  const url =  "https:us14.api.mailchimp.com/3.0/lists/020ef53525";

  const options = {
    method: "POST",
    auth: "Niteesh:441b0da7ce937a3dee36d32e28f8217d-us14"
  }

  const request = https.request(url,options,function(response) {
    response.on("data",function(data){
      const responseData = JSON.parse(data);
      if(responseData.error_count === 0)
      {
        res.sendFile(__dirname+"/success.html");
      }else{
        res.sendFile(__dirname+"/failure.html")
      }
    })
  })
  request.write(jsonData);
  request.end();


});

app.post("/failure",function(req,res) {
  res.redirect("/");
})

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
});

app.listen(process.env.PORT || 3000,function(){
  console.log("server working!!");
})


// API KEY = 441b0da7ce937a3dee36d32e28f8217d-us14
//audience ID =  020ef53525
