const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = '';

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
});

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    request(url, function (err, response, body) {
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `目前 ${weather.name} 的氣溫為攝氏 ${weather.main.temp} 度!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
});

app.listen(process.env.port || process.env.PORT || 80, function () {
  console.log('Server started.')
});