const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

console.log(__dirname)
console.log(__filename)

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
app.use(express.static(path.join(__dirname, '../public')))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lei Han'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Lei Han'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Lei Han',
        message: 'Help Page'
    })
})

app.get('/weather', (req, res)=> {
    if (!req.query.address) {
        return res.send({error: 'You must provide address'})
    }

    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send(
                {
                    location,
                    forecast: forecastData,
                    address: req.query.address
                },
            )        
        })
    })   
})

app.get('/products', (req, res)=> {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'No help article found',
        title: 'Help Not found',
        name: 'Lei Han',
    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        errorMessage: '404 page',
        title: 'Not found',
        name: 'Lei Han',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
