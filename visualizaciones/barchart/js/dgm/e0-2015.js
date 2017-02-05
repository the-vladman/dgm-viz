var visualization = d3plus.viz()
.container("#viz") // container DIV to hold the visualization
.data("partials/e0-2015.json")
.id("ent") // key for which our data is unique on
.type("bar") //visualization type
//Rango de colores según valor
.color({
  "heatmap": [ "#34dab3" , "#00cc99", "#158a8c" ],
  "value": "e0"
})
.x("ent")
.y({"value":"e0", "range": [60,80]})
.font({ "family": "'Open Sans', sans-serif" })
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
.legend(false)
.resize(true)
.draw()  //finally, draw the visualization!
