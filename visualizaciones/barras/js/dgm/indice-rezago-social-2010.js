var visualization = d3plus.viz()
.container("#viz") // container DIV to hold the visualization
.data("partials/indice-rezago-social-2010.json")
.id("x") // key for which our data is unique on
.type("bar") //visualization type
//Rango de colores según valor
.color({
  "range": [ "#34dab3" , "#00cc99", "#158a8c" ],
  "value": "y"
})
.x("x")
.y("y")
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
.draw()  //finally, draw the visualization!
