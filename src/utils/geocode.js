const request = require('request')
const geocode = (address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibXVoYW1tYWQtc3llZCIsImEiOiJjazhvaHkybXAwMG5xM2VvMHNpZGk3aXN5In0.Cavxt5FvTNz-RyD6Wl-tMg&limit=1'
    request({url, json : true},(error,response)=>{
        if(error){
            callback('unable to connect with location server',undefined)
        } 
        else if (response.body.features.length === 0){
            callback('Location Not Found',undefined)
        }else{
            const {place_name : place , center } = response.body.features[0]
            callback(undefined,{place: place, longitude:center[0], latitude : center[1]})
            }
    })
}

module.exports = geocode