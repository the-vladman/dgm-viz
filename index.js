'use strict'

var app = require('./app');
// se define el puerto como variable de entorno
var port = process.env.PORT || 3977;

app.listen(port, function(){
  console.log("Servidor escuchando en http://localhost:"+port);
})
