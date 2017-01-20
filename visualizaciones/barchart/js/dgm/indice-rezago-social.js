
var jsonBarchart;

$.ajax({
  type: "GET",
  url: "partials/indice-rezago-social_porEstado.json",
  async: false,
  success: function(data){
    if (validaJsonBarChart(data) ){
      jsonBarchart = data;
    }
  }
});

  var categoryDatos = ["#158a8c","#00cc99","#53e5be"];

  d3.scale.categoryDatos = function() {
      return d3.scale.ordinal().range(categoryDatos);
  };

  var colorRange = d3.scale.category20();
  var color = d3.scale.ordinal()
  .range(categoryDatos);

  var divTooltip = d3.select("#bar-chart").append("div").attr("class", "toolTip");

  var dataset = jsonBarchart.valores;
  var arrayLegends = [];

  $.each(dataset, function( index, value ) {
    arrayLegends.push(value.key);
  });

nv.addGraph(function() {
  var chart = nv.models.multiBarChart()
      .reduceXTicks(false)
      .showControls(false)
      .showLegend(false)
      .groupSpacing(0.3)
      .margin({"top":5})
      .color(d3.scale.categoryDatos().range());

    chart.yAxis
      .axisLabel(jsonBarchart.ejey.toUpperCase())
      .margin({"left":60,"right":5,"top":10,"bottom":10})
      .tickFormat(d3.format(',.1f'));

    chart.xAxis
      .axisLabel(jsonBarchart.ejex.toUpperCase())
      .rotateLabels(45)
      .margin({"left":100,"right":5,"top":10,"bottom":20});

    d3.select('#bar-chart svg')
        .datum(dataset)
        .call(chart);

  nv.utils.windowResize(chart.update);

  return chart;
});

  // Validacion de BarChart
  function validaJsonBarChart(jsonBarchart){

      var valores = jsonBarchart["valores"];

      for(index_valor in valores){
          var llaves_elemento = Object.keys(valores[index_valor]);
          if(!llaves_elemento.some(elem => elem === 'key')){
              alert("Error en la estructura del JSON: El campo key es requerido dentro de los valores. Elemento: " + (parseInt(index_valor) + 1).toString());
              return false;
          }

          for(index_llave in llaves_elemento){
              if(llaves_elemento[index_llave] === 'label'){
                  if(typeof llaves_elemento[index_llave] !== 'string'){
                      alert("Error en la estructura del JSON: El campo label debe ser una cadena");
                      return false;
                  }
              }
          }
      }

      return true;
  }