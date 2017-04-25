var visualization = d3plus.viz()
.container("#viz") // container DIV to hold the visualization
.data("partials/crect-2013.json")
.id("ent") // key for which our data is unique on
.type("bar") //visualization type
//Rango de colores según valor
.color({
  "range": [ "#d4d481" , "#ffaf65", "#ec6d65" ],
  "value": "crect"
})
.x("ent")
.y("crect")
.order({"agg":"max","sort":"asc","value":"crect"})
.font({ "family": "'Open Sans', sans-serif", "size": 14 })
.format({
  "text": function(text, params) {
    if (text === "crect") {
      return "Crecimiento total";
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
