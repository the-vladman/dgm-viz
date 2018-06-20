var jsonChart;
  //Llamada ajax Json
  $.ajax({
      async: false,
      type: "GET",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      url: "partials/dgm/auditorias.json",
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
    .container("#treemapd3") // container DIV to hold the visualization
    .data(jsonChart.datos)
    .id(["entidad", "ejercicio", "fondo"]) // key for which our data is unique on
    .type("tree_map") //visualization type
    .size("numero_revisados") //sizing of blocks
    //Rango de colores según valor
    .color({
        "heatmap": ["#6985d0", "#f7d360", "#ec6d65"],
        "range": ["#6985d0", "#f7d360", "#ec6d65"],
        "scale": ["#6985d0", "#f7d360", "#ec6d65"],
        "value": "numero_revisados"
    })
    .font({
        "family": "'Open Sans', Helvetica, Arial, sans-serif",
        "size": 14
    })
    .format({
        "locale": "es_ES"
    })
    .tooltip({
        "small": 350
    })
    .resize(true)
    .height(dimension)
    .legend(false)
    .draw()
