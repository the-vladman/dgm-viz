var visualization = d3plus.viz()
.container("#viz") // container DIV to hold the visualization
.data("partials/pob-2006.json")
.id("ent") // key for which our data is unique on
.type("bar") //visualization type
//Rango de colores según valor
.color({
  "heatmap": [ "#d4d481" , "#ffaf65", "#ec6d65" ],
  "value": "pob"
})
.x("ent")
.y("pob")
.order({"agg":"max","sort":"asc","value":"pob"})
.font({ "family": "'Open Sans', sans-serif", "size": 14 })
.format({
  "text": function(text, params) {
    if (text === "pob") {
      return "Población media Total";
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
