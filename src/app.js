const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

// Define paths for express config 

const pubfiles = path.join(__dirname,'../public')
// Static pages
app.use(express.static(pubfiles))

// customizing views directory
const views = path.join(__dirname,'../templates/views')
// partials-path
const partials = path.join(__dirname,'../templates/partials')

// dynamic pages -handlers views location
app.set('view engine','hbs')
app.set('views',views)
hbs.registerPartials(partials)

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Winker',
        name: 'Muhammad Syed',
        background: '/image/main.jpg'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Muhammad Syed',
        background: '/image/main.jpg'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        help: 'Helping text',
        title:'Help',
        name:'Muhammad Syed',
        background: '/image/main.jpg'

    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
           error : 'Please provide an address',
           background: '/image/main.jpg'
        })
    }
    
    geocode(req.query.address,(error,{place,latitude,longitude}={})=>{
        if(error){
            return res.send({error})
        }
        forcast(latitude,longitude,(error,forcastdata)=>{
            if(error){
                return res.send({error}
                )
            }
            else{
            res.send({
                place,
                Forcast : forcastdata
                }
            )}
        })
    })

})

// app.get('/products',(req,res)=>{
// 
    // if(!req.query.search){
        // return res.send({
            // error:'You must provide as search term'
        // })
    // }
    // console.log(req.query.search)
    // res.send({
        // product: []
    // })
// 
// })
// 

app.get('/help/*',(req,res)=>{

    res.render('error',{
        title: '404 Error',
        text:'Help Article Not Found',
        name: 'Muhammad Syed',
        background: '/image/main.jpg'
    })

})

app.get('*',(req,res)=>{
    res.render('error',{
    title: '404 Error',
    text:'Page Not Found',
    name : 'Muhammad Syed',
    background: '/image/main.jpg'
})

})


app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})

console.log('Done')