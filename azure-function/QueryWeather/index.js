const request = require('request');
const apiKey = "";

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.city || (req.body && req.body.city)) {
        let city = req.query.city || req.body.city;
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        request(url, function (err, response, body) {
            let status = 200;
            let msg = "";
            if(err){
                status = 400;
                msg = 'Error, please try again';
            } else {
                let weather = JSON.parse(body)
                if(weather.main == undefined){
                    status = 400;
                    msg = 'Error, please try again';
                } else {
                    msg = `目前 ${weather.name} 的氣溫為攝氏 ${weather.main.temp} 度!`;
                }
            }
            context.res = {
                status: status,
                body: msg
            };
            context.done();

        });
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a city on the query string or in the request body"
        };
        context.done();
    }
};