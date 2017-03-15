
  d3plus.viz()
  .container("#viz")
  .data("partials/pueblosmagicos.json")
  .type("pie")
  .id("estado")
  .size("valor")
  .color({
    "heatmap": ["#34DAB3","#30D1AE","#2DC8AA","#29BFA6","#26B6A1","#22AD9D","#1FA499","#1B9B94","#189290","#158A8C"],
    "value": "valor"
  })
  .legend(false)
  .font({
      "family": "'Open Sans', Helvetica, Arial, sans-serif",
      "size": 12
  })
  .format({
    "text": function(text, params) {

      if (text === "valor") {
        return "Pueblos mágicos";
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
      "small": 400
  })
  .resize(true)
  .draw()
