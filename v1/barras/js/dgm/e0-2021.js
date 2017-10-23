var jsonChart;
  //Llamada ajax Json
  $.ajax({
      async: false,
      type: "GET",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      url: "partials/e0-2021.json",
      success: function(data) {
          jsonChart = data;
      }
  });
  var dimension;
  var valor = obtenerValorParametro("muestra");
    if (valor == "td"){
      $('#vermas').show();
      $("#titulo").html("<strong><p>"+jsonChart.titulo+"</p></strong>");
      $("#descripcion").html("<p>"+jsonChart.descripcion+"</p>");
      dimension = window.innerHeight - $("#titulo").outerHeight(true) - $("#descripcion").outerHeight(true) - $("#vermas").outerHeight(true) - 50;
    }
    else if (valor == "t"){
      $('#vermas').show();
      $('#descripcion').remove();
      $("#titulo").html("<strong><p>"+jsonChart.titulo+"</p></strong>");
      dimension = window.innerHeight - $("#titulo").outerHeight(true) - $("#vermas").outerHeight(true) - 40;
    }
    else if (valor == "d"){
      $('#vermas').show();
      $('#titulo').remove();
      $("#descripcion").html("<p>"+jsonChart.descripcion+"</p>");
      dimension = window.innerHeight - $("#descripcion").outerHeight(true) - $("#vermas").outerHeight(true) - 40;
    }
    else{
      $('#vermas').remove();
      $('#titulo').remove();
      $('#descripcion').remove();
      dimension = window.innerHeight - 20;
    }
//función para leer los parametros pasados por medio de la url
function obtenerValorParametro(sParametroNombre) {
  var sPaginaURL = window.location.search.substring(1);
   var sURLVariables = sPaginaURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
      var sParametro = sURLVariables[i].split('=');
      if (sParametro[0] == sParametroNombre) {
        return sParametro[1];
      }
    }
   return null;
}

var visualization = d3plus.viz()
.container("#viz") // container DIV to hold the visualization
.data(jsonChart.datos)
.id("ent") // key for which our data is unique on
.type("bar") //visualization type
//Rango de colores según valor
.color({
  "heatmap": [ "#d4d481" , "#ffaf65", "#ec6d65" ],
  "value": "e0"
})
.x("ent")
.y({"value":"e0", "heatmap": [60,80]})
.order({"agg":"max","sort":"asc","value":"e0"})
.font({ "family": "'Open Sans', sans-serif", "size": 14 })
.format({
  "text": function(text, params) {
    if (text === "e0") {
      return "Esperanza de vida al nacimiento total (ambos sexos)";
    }
    if (text === "ent") {
      return "Estados";
    }
    else {
      return d3plus.string.title(text, params);
    }

  },
  "number": function(number, params) {
    var formattedFirst = d3plus.number.format(number, params);
    n = parseFloat(number).toFixed(1);
    formatted = Number(n).toLocaleString('en');
    return formatted;
  },
  "locale":"es_ES"
})
.legend(true)
.resize(true)
.height(dimension)
.draw()  //finally, draw the visualization!
