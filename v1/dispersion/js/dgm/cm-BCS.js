var jsonChart;
//Llamada ajax Json
$.ajax({
  async: false,
  type: "GET",
  contentType: "application/json; charset=utf-8",
  dataType: "json",
      url: "partials/cm-BCS.json",
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
d3plus.viz()
  .container("#scatterplot")
  .data(jsonChart.datos)
  .type("scatter")
  .id(["municipio", "titular"])
  .x({
    "value": "superficie",
    "scale": "linear",
    "label": "Superficie en km²"
  })
  .y({
    "value": "vigencia",
    "label": "Vigencia en meses"
  })
  .size("superficie")
  .color({
    "heatmap": ["#d4d481", "#ffaf65", "#ec6d65"],
    "scale": ["#d4d481", "#ffaf65", "#ec6d65"],
    "value": "superficie"
  })
  .font({
    "family": "'Open Sans', Helvetica, Arial, sans-serif",
    "size": 14
  })
  .format({
    "text": function(text, params) {
      if (text === "superficie") {
        return "Superficie en km²";
      }
      if (text === "vigencia") {
        return "Vigencia en meses";
      } else {
        return d3plus.string.title(text, params);
      }
    },
    "number": function(number, params) {
      //var formattedFirst = d3plus.number.format(number, params);
      var formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      n = parseFloat(number).toFixed(1);
      var formatted = Number(n).toLocaleString('en');
      return formatted;
    },
    "locale": "es_ES"
  })
  .labels(true)
  .tooltip({
    "value": ["titular", "titulo", "superficie", "lote", "inicio", "fin", "vigencia", "descripcion", "carta_inegi"],
    "small": 320
  })
  .resize(true)
  .height(dimension)
  .draw()
