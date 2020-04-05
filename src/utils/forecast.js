const request = require('request');


const forecast = (lat , long , cb) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a4c25aeb7fb8e554bce5ead44ae2e1bd&units=metric&lang=pt_br`
    request({url , json : true} , (error , {body}) => {
        if (error){
            cb('unable to connect to weather service')
        } else  if (body.error){
            cb('connected to weather service, but the following error occured:' + body.error)
        } else {
            cb(undefined , {
                temp : body.main.temp ,
                hum : body.main.humidity,
                desc : body.weather[0].description
            })
        }
    })
}

module.exports = forecast