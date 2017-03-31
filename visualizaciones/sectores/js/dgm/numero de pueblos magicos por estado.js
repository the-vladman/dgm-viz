
d3plus.viz()
.container("#viz")
.data("partials/pueblosmagicos.json")
.type("pie")
.id("estado")
.size("valor")
.color({
  "heatmap": ["#34DAB3","#158A8C"],
  "value": "valor"
})
.legend(false)
.font({ "family": "'Open Sans', Helvetica, Arial, sans-serif"})
.labels({"padding":"10", "resize": true})
.format({
  "text": function(text, params) {
    if (text === "valor") {
      return "Pueblos mágicos";
    }
    if (text === "municipio") {
      return "Municipios";
    }
    else {
      return d3plus.string.title(text, params);
    }
  },
  "number": function(number, params) {
      n = parseFloat(number).toFixed(1)
      var formatted = Number(n).toLocaleString('en');
      if (params.key == "valor") {
          //return "$" + formatted;
          return formatted;
      } else {
          return formatted + '%';
      }
  },
  "locale":"es_ES"
})
.tooltip({
    "value": ["valor", "municipio"],
})
.resize(true)
.draw()
