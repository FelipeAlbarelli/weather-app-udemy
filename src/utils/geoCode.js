const request = require('request')

const geoCode = (address , cb = (error , res) => {}) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmVsaXBlYWxiYXJlbGxpIiwiYSI6ImNrOGhwc2I0dDAzZzQzZW50emRpeXJsbGYifQ.wSl8tRDyHo9I9v3jJBFV7g&limit=1&language=pt_br`
    request({url , json : true} , (error , {body}) => {
        if (error){
            cb('unable to connect to geoCode service')
        } else if (body.features.length == 0){
            cb('no locations found')
        } else {
            cb(undefined , {
                lat : body.features[0].center[1],
                lon :body.features[0].center[0],
                location :body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode