var jsonChart;
//Llamada ajax Json
$.ajax({
  async: false,
  type: "GET",
  contentType: "application/json; charset=utf-8",
  dataType: "json",
      url: "partials/24.json",
  success: function(data) {
    jsonChart = data;
  }
});
var dimension;
var valor = obtenerValorParametro("muestra");
  if (valor == "td"){
    $("#titulo").html("<strong><p>"+jsonChart.titulo+"</p></strong>");
    $("#descripcion").html("<p>"+jsonChart.descripcion+"</p>");
    dimension = window.innerHeight - $("#titulo").outerHeight(true) - $("#descripcion").outerHeight(true) - $("#vermas").outerHeight(true) - 50;
  }
  else if (valor == "t"){
    $('#descripcion').remove();
    $("#titulo").html("<strong><p>"+jsonChart.titulo+"</p></strong>");
    dimension = window.innerHeight - $("#titulo").outerHeight(true) - $("#vermas").outerHeight(true) - 40;
  }
  else if (valor == "d"){
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
  .container("#viz")
  .data(jsonChart.datos)
  .type("pie")
  .id(["tipo", "ambito"])
  .size("valor")
  .color({
    "heatmap": ["#6985d0", "#f7d360", "#ec6d65"],
    "scale": ["#6985d0", "#f7d360", "#ec6d65"],
    "value": "valor"
  })
  .legend(false)
  .font({
    "family": "'Open Sans', Helvetica, Arial, sans-serif",
    "size": 14
  })
  .format({
    "text": function(text, params) {
      if (text === "valor") {
        return "Centros de Trabajo";
      } else {
        return d3plus.string.title(text, params);
      }
    },
    "number": function(number, params) {
      n = parseFloat(number).toFixed(1)
      var formatted = Number(n).toLocaleString('en');
      if (params.key == "valor") {
        //return "$" + formatted;
        return formatted;
      } else {
        return formatted + '%';
      }
    },
    "locale": "es_ES"
  })
  .resize(true)
  .height(dimension)
  .draw()
