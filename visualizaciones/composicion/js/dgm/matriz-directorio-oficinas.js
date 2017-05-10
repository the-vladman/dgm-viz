//instantiate d3plus Treemap
var jsonChart;
  //Llamada ajax Json
  $.ajax({
      async: false,
      type: "GET",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      url: "partials/dgm/matriz-directorio-oficinas.json",
      success: function(data) {
          jsonChart = data;
      }
  });
  var dimension = window.innerHeight;
  var valor = obtenerValorParametro("muestra");
    if (valor == "td"){
      $("#titulo").html("<strong><p>"+jsonChart.titulo+"</p></strong>");
      $("#descripcion").html("<p>"+jsonChart.descripcion+"</p>");
      dimension = dimension -150;
    }
    else if (valor == "t"){
      $('#descripcion').remove();
      $("#titulo").html("<strong><p>"+jsonChart.titulo+"</p></strong>");
      dimension = dimension -150;
    }
    else if (valor == "d"){
      $('#titulo').remove();
      $("#descripcion").html("<p>"+jsonChart.descripcion+"</p>");
      dimension = dimension -150;
    }
    else{
      $('#titulo').remove();
      $('#descripcion').remove();
      dimension = dimension -20;
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
.container("#treemapd3") // container DIV to hold the visualization
.data(jsonChart.datos)
.id(["entidad", "municipio", "nombre"]) // key for which our data is unique on
.type("tree_map") //visualization type
.size("valor") //sizing of blocks
//Rango de colores según valor
.color({
    "range": ["#6985d0", "#f7d360", "#ec6d65"],
    "heatmap": ["#6985d0", "#f7d360", "#ec6d65"],
    "scale": ["#6985d0", "#f7d360", "#ec6d65"],
    "value": "valor"
})
.font({
    "family": "'Open Sans', Helvetica, Arial, sans-serif",
    "size": 14
})
.format({
    "text": function(text, params) {

        if (text === "valor") {
            return "Oficinas";
        }
        if (text === "telefono") {
            return "Teléfono";
        }
        else {
            return d3plus.string.title(text, params);
        }
    },
    "number": function(number, params) {
        var formattedFirst = d3plus.number.format(number, params);
        //var formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        n = parseFloat(number).toFixed(0)
        var formatted = Number(n).toLocaleString('en');
        if (params.key == "valor") {
            return n;
        }
        else {
            return formatted + '%';
        }
    },
    "locale": "es_ES"
})
.tooltip({
    "value": ["nombre", "dependencia", "telefono", "domicilio"],
    "small": 350
})
.resize(true)
.legend(false)
.ui({
    "padding": 15
})
.draw() //finally, draw the visualization!
