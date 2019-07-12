const path = require('path')
const express = require('express')
const hbs = require('hbs')
const utility=require('./utils.js')
const port=process.env.PORT || 3000;
const app = express() 

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vaishakh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Vaishakh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Vaishakh'
    })
})

app.get('/weather', function(req, res){
    if(!req.query.address){
        return res.send("Please Provide an address")
    }
    utility.geocode(req.query.address,function(error,data)
    {
        if(error){
        return res.send({
            error:error
         })
        }
    //     console.log('data',data)
        if(data){
             var address= 'https://api.darksky.net/forecast/6c2228207a65ff66e5330730594d1270/'+encodeURIComponent(data.lat)+','+encodeURIComponent(data.long)+'?units=si';
    utility.darksky(address,function(error,data1){
        res.send({
            temp:data1.temp,
            rain:data1.rain,
            loc:data.loc,
            summary:data1.summary
        })
    })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port);
})