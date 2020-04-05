const express = require('express');
const ch = require('chalk');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const log = console.log;

const app = express();


// def paths to express config
const publicDir = path.join(__dirname , '../public');
const viewsDir  = path.join(__dirname , '../template/views');
const partilasPath = path.join(__dirname , '../template/partials');

// setup hbs engine and views location
app.set('view engine' , 'hbs');
app.set('views' , viewsDir)
hbs.registerPartials(partilasPath)

// serve static directory to server
app.use(express.static(publicDir));

app.get('' , (req , res) => {
    res.render('index' , {
        title : 'Weather!',
        name : 'Felipe Albarelli'
    })
})

app.get('/about' , (req , res) => {
    res.render('about' , {
        title : 'About',
        name : 'Felipe Albarelli'
    })
})

app.get('/help' , (req , res) => {
    res.render('help' , {
        helpMsg : 'this is some help msg',
        title : 'Help',
        name : 'Felipe Albarelli'
    })
})

app.get('/weather' , (req, res) => {
    if (!req.query.address){
        return res.send({
            error : 'address should be given'
        })
    }
    geoCode(req.query.address , (error , {lat , lon , location} = {} ) => {
        if (error){
            res.send({error})
        } else {
            forecast(lat , lon , (error , {temp , hum , desc} = {}) => {
                if (error){
                    res.send({error})
                } else {
                    res.send({
                        location,
                        temp,
                        desc
                    })
                }
            } )
        }
    })
})

app.get('/help/*' , (req , res) => {
    res.render('notFound', {
        notFoundMsg : 'no help page found',
        title : "Help",
        name : 'Felipe Albarelli'
    })
})

app.get('/pro' , (req, res) => {
    if (req.query.search){
        res.send({
            product : req.query.search
        })
    } else {
        res.send({
            error : 'you must provide a search term'
        })
    }
})

// * match anything
app.get('*' , (req , res) => {
    res.render('notFound', {
        notFoundMsg : 'no page found',
        title : '404',
        name : 'Felipe Albarelli'
    })
})


app.listen(3000 , () => {
    log('-----------------------------------------------')
    log(ch.magenta('    server running on port') , ch.blue(3000) )
})

