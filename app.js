'use strict'

/* URL para del cdn de datos.gob.mx usado para cargar navbar y footer */
process.env.CDN_URL = 'https://cdn.datos.gob.mx';
// se agregan las bibliotecas requeridas
var express = require('express');
//var bodyParser = require('body-parser');
// instancia de express
var app = express();

//cargar rutas
var viz_routes = require('./routes/viz');

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
    res.render('index');
});

//rutas base
app.use('/viz', viz_routes);
// contenido estatico
app.use(express.static('public'));
// se define app como nombre a instanciar en otros archivos
module.exports = app;
