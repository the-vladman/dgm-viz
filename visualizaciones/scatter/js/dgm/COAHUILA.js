  var jsonScatter;
  //Llamada ajax Json
  $.ajax({
      type: "GET",
      url: "partials/COAHUILA.json",
      async: false,
      success: function(data) {
              jsonScatter = data;
      }
  });

  //Escala de colores
  var categoryDatos = [
      "#00cc99",
      "#ff6666",
      "#663399",
      "#474747",
      "#ff9900",
      "#0099ff",
      "#333399",
      "#000000",
      "#006666",
      "#ff6699",
      "#666699",
      "#999999"
  ];

  d3plus.viz()
      .container("#scatterplot")
      .data(jsonScatter.valores)
      .type("scatter")
      .id(["MUNICIPIO", "TITULAR"])
      .x({
          "value": "INICIO",
          "scale": "discrete",
          "label": jsonScatter.ejex
      })
      .y({
          "value": "VIGENCIA",
          "label": jsonScatter.ejey
      })
      .size("SUPERFICIE")
      .font({ "family": "'Open Sans', Helvetica, Arial, sans-serif" })
      .format({
          "number": function(number, params) {
              //var formattedFirst = d3plus.number.format(number, params);
              var formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              n = parseFloat(number).toFixed(4);
              var formatted = Number(n).toLocaleString('en');
              return formatted;
          },
          "locale": "es_ES"
      })
      .labels(false)
      .tooltip({
          "value": ["TITULAR", "TITULO", "NOMBRE LOTE", "INICIO", "FIN", "VIGENCIA", "COO UTM X", "COO UTM Y", "CARTA INEGI"],
          "size": false,
          "small": 300
      })
      .color({
          "value": "MUNICIPIO",
          "scale": categoryDatos
      })
      .legend(false)
      .resize(true)
  .draw()

  //$("#scatterplot").prepend("draw");

  var getNumbers = [];
  var middle = 0;

  //// Simbología ////
  $.each(jsonScatter.valores, function(key, value) {
      var numberFormat = parseFloat(value.VIGENCIA).toLocaleString('es');
      var new_num = Math.round(numberFormat);
      getNumbers.push(new_num);
      middle = middle + new_num;
  });

  var mayorNum = Math.max.apply(Math, getNumbers).toFixed(3);
  var menorNum = Math.min.apply(Math, getNumbers).toFixed(3);
  var middleOp = middle / jsonScatter.valores.length;
  var middleEnd = Math.round(middleOp).toFixed(3)

  $("#legendBig").html("> " + mayorNum.replace(".", ",") + " " + jsonScatter.unidad);
  $("#legendMd").html("> " + middleEnd.replace(".", ",") + " " + jsonScatter.unidad);
  $("#legendSm").html("> " + menorNum.replace(".", ",") + " " + jsonScatter.unidad);

