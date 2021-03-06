var jsonChart;
  //Llamada ajax Json
  $.ajax({
      async: false,
      type: "GET",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      url: "partials/indice-rezago-social-2005.json",
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
.id("x") // key for which our data is unique on
.type("bar") //visualization type
//Rango de colores según valor
.color({
  "range": [ "#d4d481" , "#ffaf65", "#ec6d65" ],
  "value": "y"
})
.x("x")
.y("y")
.order({"agg":"max","sort":"asc","value":"y"})
.font({ "family": "'Open Sans', sans-serif", "size": 14 })
.format({
  "text": function(text, params) {
    if (text === "y") {
      return "Índice de rezago social";
    }
    if (text === "x") {
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
