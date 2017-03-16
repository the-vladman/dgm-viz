  d3plus.viz()
      .container("#scatterplot")
      .data("partials/cm-TAMAULIPAS.json")

      .type("scatter")
      .id(["municipio", "titular"])
      .x({
          "value": "superficie",
          "scale": "linear",
          "label": "Superficie en km²"
      })
      .y({
          "value": "vigencia",
          "label": "Vigencia en meses"
      })
      .size("superficie")
      .color({
          "heatmap": ["#34DAB3", "#30D1AE", "#2DC8AA", "#29BFA6", "#26B6A1", "#22AD9D", "#1FA499", "#1B9B94", "#189290", "#158A8C"],
          "value": "superficie"
      })
      .font({
          "family": "'Open Sans', Helvetica, Arial, sans-serif",
          "size": 14
      })
      .format({
          "text": function(text, params) {
            if (text === "superficie") {
              return "Superficie en km²";
            }
            if (text === "vigencia") {
              return "Vigencia en meses";
            }
            else {
              return d3plus.string.title(text, params);
            }
          },
          "number": function(number, params) {
              //var formattedFirst = d3plus.number.format(number, params);
              var formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              n = parseFloat(number).toFixed(1);
              var formatted = Number(n).toLocaleString('en');
              return formatted;
          },
          "locale": "es_ES"
      })
      .labels(true)
      .tooltip({
          "value": ["titular", "titulo", "superficie", "lote", "inicio", "fin", "vigencia", "descripcion", "carta_inegi"],
          "small": 400
      })
      .resize(true)
      .draw()
