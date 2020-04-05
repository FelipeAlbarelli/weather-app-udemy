const https = require('https')
const log = console.log
const [lat , long] = [40 , -75]

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a4c25aeb7fb8e554bce5ead44ae2e1bd&units=metric&lang=pt_br`


const request = https.request(url , responce => {

    responce.on('data' , chunk => {
        log(chunk.toString())
    })

    responce.on('end' , () => {
        log('end')
    })
    

})

request.end()