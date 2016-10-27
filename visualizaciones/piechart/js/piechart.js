  
  var jsonPiechart;
  var total = 0;

  $.ajax({
    type: "GET",
    url: "partials/piechart_example.json",
    async: false,
    success: function(data){
      if (validaJsonPieChart(data.valores)){
          jsonPiechart = data;
          jsonPiechart.valores.forEach(function(d) {
            total = total + d.value;
          });
      }
    }
  });

  //Escala de colores
  var categoryDatos = [
    "#00cc99",
    "#ff6666",
    "#663399",
    "#474747",
    "#ff9900",
    "#0099ff",
    "#333399",
    "#000000",
    "#006666",
    "#ff6699",
    "#666699",
    "#999999"
  ];

  d3plus.viz()
  .container("#viz")
  .data(jsonPiechart.valores)
  .type("pie")
  .id("label")
  .size("value")
  .color({
    "scale": categoryDatos,
    "value": "label"
  })
  .font({ "family": "'Open Sans', Helvetica, Arial, sans-serif" })
  .format({
    "text": function(text, params) {
      
      if (text === "value") {
        return jsonPiechart.unidad;
      }
      else {
        return d3plus.string.title(text, params);
      }
      
    },
    "number": function(number, params) {
      n = parseFloat(number).toFixed(2)
      var formatted = Number(n).toLocaleString('en');
      if (params.key == "value") {
        //return "$" + formatted;
        return formatted;
      }
      else {
        return formatted + '%';
      }
    },
    "locale":"es_ES"
  })
  .height(jsonPiechart.ancho)
  .resize(true)
  .draw()

      // Validacion de Json
      function validaJsonPieChart(json){
          var json_fields = ['label', 'value'],
              json_types = {'label': 'string', 'value': 'number'};

          for(var elemento in json){
              var llaves_elemento = Object.keys(json[elemento]);
              for(var k in llaves_elemento ){
                  if(!json_fields.some(elem => elem === llaves_elemento[k])){
                      alert("Error en la estructura del JSON: Campo invalido: " + llaves_elemento[k]);
                      return false;
                  }

                  if(typeof json[elemento][llaves_elemento[k]] !== json_types[llaves_elemento[k]]){
                      alert("Error en la estructura del JSON: El campo " + llaves_elemento[k] + " debe ser de tipo " + json_types[llaves_elemento[k]]);
                      return false;   
                  }
              }
          }
          return true;
      }