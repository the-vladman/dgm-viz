var visualization = d3plus.viz()
.container("#viz") // container DIV to hold the visualization
.data("partials/nac-1999.json")
.id("ent") // key for which our data is unique on
.type("bar") //visualization type
//Rango de colores según valor
.color({
  "heatmap": [ "#34dab3" , "#00cc99", "#158a8c" ],
  "value": "nac"
})
.x("ent")
.y("nac")
.font({ "family": "'Open Sans', sans-serif" })
.format({
  "text": function(text, params) {
    if (text === "nac") {
      return "Nacimientos anuales";
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
    var formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    n = parseFloat(number).toFixed(1)
    formatted = Number(n).toLocaleString('en');
    if (params.key == "crect") {
      return formatted;
    }
    else {
      return formatted;
    }
  },
  "locale":"es_ES"
})
.legend(false)
.resize(true)
.draw()  //finally, draw the visualization!
