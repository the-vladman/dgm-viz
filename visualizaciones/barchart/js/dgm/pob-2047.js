
var jsonBarchart;

$.ajax({
  type: "GET",
      url: "partials/pob-2047.json",

  async: false,
  success: function(data){
    if (validaJsonBarChart(data) ){
      jsonBarchart = data;
    }
  }
});

  var categoryDatos = ["#00cc99","#ff6666","#663399","#474747","#ff9900","#0099ff","#333399","#000000","#006666","#ff6699","#666699","#999999","#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94","#e377c2","#f7b6d2","#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d","#17becf","#9edae5"];

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
      .x(function(d) { return d.ent })
      .y(function(d) { return d.pob })
      .transitionDuration(350)
      .reduceXTicks(false)
      .rotateLabels(45)
      .showControls(false)
      .showLegend(false)
      .groupSpacing(0.1)
      .margin({"left":100,"right":20,"top":5,"bottom":100})
      .color(d3.scale.categoryDatos().range())
      .tooltipContent( function(key, x, y){
          return "<span>" + x +": " + y + "</span>"
      });

    chart.yAxis
      .axisLabel(jsonBarchart.ejey.toUpperCase())
      .margin({"left":100,"right":5,"top":10,"bottom":10})
      .tickFormat(d3.format(',.0f'));

    chart.xAxis
      .axisLabel(jsonBarchart.ejex.toUpperCase())
      .rotateLabels(-45)
      .margin({"left":100,"right":5,"top":10,"bottom":10});

    d3.select('#bar-chart svg')
        .datum(dataset)
        .call(chart);

  nv.utils.windowResize(chart.update);

  return chart;
});

//////////////////// Horizontal Legend ////////////////

/*var svgLegned4 = d3.select(".svgLegend4").append("svg")
.attr("width", '100%')
.attr("height", '100%')
.attr("font-family","Open sans")

var dataL = 0;
var offset = 20;

var legend4 = svgLegned4.selectAll('.legend4')
.data(arrayLegends)
.enter().append('g')
.attr("class", "legend4")
.style("overflow", "hidden")
.style("text-overflow", "ellipsis")
.attr("title", "20")
.attr("transform", function (d, i) {
  if (i == 0) {
    dataL = d.length + offset
    return "translate(0,0)"
  } else {
    var newdataL = dataL
    dataL += offset + 9
    return "translate(" + (newdataL) + ",0)"
  }
})

legend4.append('rect')
.attr("x", 0)
.attr("y", 0)
.attr("width", 20)
.attr("height", 20)
.attr("title", "20")
.style("fill", color);

legend4.on("mousemove", function(d){
  divTooltip.style("left", d3.event.pageX-55+"px");
  divTooltip.style("top", d3.event.pageY-90+"px");
  divTooltip.style("display", "inline-block");
  var x = d3.event.pageX, y = d3.event.pageY
  var elements = document.querySelectorAll(':hover');
  l = elements.length
  l = l-1
  elementData = elements[l].__data__
  divTooltip.html("<span class='title-pop'>"+d+"</span>");
});

legend4.on("mouseout", function(d){
  divTooltip.style("display", "none");
});

$('.legend4').append('<span class="legend">Leyenda</span>');*/

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