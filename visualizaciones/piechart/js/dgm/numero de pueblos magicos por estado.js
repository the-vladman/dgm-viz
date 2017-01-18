
  var jsonPiechart;
  var total = 0;

  $.ajax({
    type: "GET",
    url: "partials/numero de pueblos magicos por estado.json",
    async: false,
      success: function(data){
          jsonPiechart = data;
          jsonPiechart.valores.forEach(function(d) {
              total = total + d.value;
          });
    }
  });



  d3plus.viz()
  .container("#viz")
  .data(jsonPiechart.valores)
  .type("pie")
  .id("label")
  .size("value")
  .color({
    "heatmap": [ "#1d5287" , "#158a8c" , "#00cc99", "#34dab3" ],
    "value": "value"
  })
  .legend(false)
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
