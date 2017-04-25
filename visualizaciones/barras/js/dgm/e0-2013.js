var visualization = d3plus.viz()
.container("#viz") // container DIV to hold the visualization
.data("partials/e0-2013.json")
.id("ent") // key for which our data is unique on
.type("bar") //visualization type
//Rango de colores según valor
.color({
  "heatmap": [ "#d4d481" , "#ffaf65", "#ec6d65" ],
  "value": "e0"
})
.x("ent")
.y({"value":"e0", "heatmap": [60,80]})
.order({"agg":"max","sort":"asc","value":"e0"})
.font({ "family": "'Open Sans', sans-serif", "size": 14 })
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
.legend(true)
.resize(true)
.draw()  //finally, draw the visualization!
