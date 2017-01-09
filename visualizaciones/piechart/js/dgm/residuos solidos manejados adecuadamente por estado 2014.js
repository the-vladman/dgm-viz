
  var jsonPiechart;
  var total = 0;

  $.ajax({
    type: "GET",
    url: "partials/residuos solidos manejados adecuadamente por estado 2014.json",
    async: false,
      success: function(data){
          jsonPiechart = data;
          jsonPiechart.valores.forEach(function(d) {
              total = total + d.value;
          });

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
