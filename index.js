const express = require ("express");

const app = express();

const https = require("https");

const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

res.sendFile(__dirname+"/weather.html");

})

app.post("/",function(req,res){

  console.log(req.body.city_name);
  const query = req.body.city_name;
  https.get("https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=1dffef494658561b09be2dd18ee8be0d&units=metric", function(response){

    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherdata = JSON.parse(data);
      console.log(weatherdata);
      const tempmum = weatherdata.main.temp;
      console.log(tempmum);
      const desc = weatherdata.weather[0].description;
      console.log(desc);
      const icon = weatherdata.weather[0].icon;
      console.log(icon);

      const imageURL = "http://openweathermap.org/img/wn/" + icon+ "@2x.png";
      res.write("<img src=" +imageURL+">");
  res.write("The temperature of"+ query +" is : " + tempmum);
  res.write(" The weather looks "+desc);
      res.send();
    })
  })

})

// https.get("https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=1dffef494658561b09be2dd18ee8be0d&units=metric", function(response){
//
//   console.log(response.statusCode);
//   response.on("data", function(data){
//     const weatherdata = JSON.parse(data);
//     console.log(weatherdata);
//     const tempmum = weatherdata.main.temp;
//     console.log(tempmum);
//     const desc = weatherdata.weather[0].description;
//     console.log(desc);
//     const icon = weatherdata.weather[0].icon;
//     console.log(icon);
//
//     const imageURL = "http://openweathermap.org/img/wn/" + icon+ "@2x.png";
//     res.write("<img src=" +imageURL+">");
// res.write("The temperature of mumbai is : " + tempmum);
// res.write(" The weather looks "+desc);
//     res.send();
//   })
// })




app.listen(3000,function(req,res){

  console.log("Server initiated at PORT 3000");
})
