const request = require('request')
const os = require('os')

const forcast = (lat,long,callback)=>{

const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=84db1daeedc28cd98a620e3178b4d257&units=metric'

request({url,json : true},(error,response)=>{

if(error){
    callback('unable to connect with weather server',undefined)
}
else if (response.body.cod === '400'){
    callback('There is something wrong with coordinates. Please Check !',undefined)
}else{
    const forcaast = response.body
    callback(undefined,' It is currently '+forcaast.main.temp+' •C out there, feels like '+forcaast.main.feels_like+' •C with '+forcaast.weather[0].description+'.')
        }
    })
}
module.exports = forcast

