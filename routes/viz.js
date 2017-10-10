'use strict'

var express = require('express');
var VizController = require('../controllers/viz');

// carga rutas de express
var rutas = express.Router();

rutas.get('/', VizController.pruebas);
// rutas.get('/', function(req, res) {
//   res.redirect('/viz');
// });

module.exports = rutas;
