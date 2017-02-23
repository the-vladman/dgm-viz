$(document).ready(function(){

	var jsonTreemap, idVal;

  //Valores iniciales para el treemap
  idVal = ["nivel1", "nivel2","nivel3"];
  loadJsonTreemap(); //Treemap

  function loadJsonTreemap(e){
    //Carga json Treemap
    $.ajax({
      url: "partials/dgm/cultivos2015.json",
      async: false,
      success: function(data){
        if (validaJsonTreeMap(data)){
          jsonTreemap = data;
        }
      }
    });
    //Dibuja treemap
    drawTreemap();
  };

  function drawTreemap(){
    //instantiate d3plus Treemap
    var visualization = d3plus.viz()
    .container("#treemapd3") // container DIV to hold the visualization
    .data(jsonTreemap.valores)
    .id(idVal) // key for which our data is unique on
    .type("tree_map") //visualization type
    .size("valor") //sizing of blocks
    //Rango de colores según valor
    .color({
      "heatmap": [ "#34dab3" , "#00cc99", "#158a8c" ],
      "value": "valor"
    })
    .font({ "family": "'Open Sans', Helvetica, Arial, sans-serif", "size": 12 })
    .format({
      "text": function(text, params) {

        if (text === "valor") {
          return jsonTreemap.unidad;
        }
        else {
          return d3plus.string.title(text, params);
        }

      },
      "number": function(number, params) {
        var formattedFirst = d3plus.number.format(number, params);
        //var formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        n = parseFloat(number).toFixed(1)
        var formatted = Number(n).toLocaleString('en');
        if (params.key == "valor") {
          return "$" + formatted;
        }
        else {
          return formatted + '%';
        }
      },
      "locale":"es_ES"
    })
    .tooltip({
      "small":350
    })
    .height(600)
    .resize(true)
		.ui({"padding":15})
    .draw()  //finally, draw the visualization!
  }

  //Validacion de Json
  function validaJsonTreeMap(json){
    var valores = json['valores'],
    json_fields = ['nivel1', 'nivel2', 'nivel3', 'valor'];
    json_types = {'nivel1': 'string', 'nivel2': 'string', 'nivel3': 'string', 'valor': 'number'};

    if(!json['unidad']){
      alert("Error en la estructura del JSON: Se necesita especificar la unidad");
      return false;
    }

    for(var elemento in valores){
      var llaves_elemento = Object.keys(valores[elemento]);
      for(var k in llaves_elemento ){
        if(!json_fields.some(elem => elem == llaves_elemento[k])){
          alert("Error en la estructura del JSON: Campo invalido: " + llaves_elemento[k]);
          return false;
        }

        if(typeof valores[elemento][llaves_elemento[k]] !== json_types[llaves_elemento[k]]){
          alert("Error en la estructura del JSON: El campo " + llaves_elemento[k] + " debe ser de tipo " + json_types[llaves_elemento[k]]);
          return false;
        }
      }
    }
    return true;
  }

});
