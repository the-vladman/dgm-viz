  var jsonScatter;
  //Llamada ajax Json
  $.ajax({
      type: "GET",
      url: "partials/Hoja3.json",
      async: false,
      success: function(data) {
          if (validaJsonScatter(data)) {
              jsonScatter = data;
          }
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
      .title(jsonScatter.label)
      .x({
          "value": "INICIO",
          "scale": "discrete",
          "label": jsonScatter.ejex
      })
      .y({
          "value": "SUPERFICIE",
          "label": jsonScatter.ejey
      })
      .size("VIGENCIA")
      .font({ "family": "'Open Sans', Helvetica, Arial, sans-serif" })
      .format({
          "number": function(number, params) {
              //var formattedFirst = d3plus.number.format(number, params);
              var formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              n = parseFloat(number).toFixed(4);
              var formatted = Number(n).toLocaleString('en');
              if (params.key === "VIGENCIA") {
                  return formatted + " meses";
              } else {
                  return formatted;
              }
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
      .legend({
          "filters": true,
          "size": 0,
          "align": "start"
      })
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


  //Validacion de Json
  function validaJsonScatter(json_scatter) {
      var keys_validaciones = ["MUNICIPIO", "VIGENCIA", "SUPERFICIE", "INICIO", "TITULAR", "TITULO", "NOMBRE LOTE", "FIN", "ENTIDAD", "DESCRIPCION", "COO UTM X", "COO UTM Y", "CARTA INEGI"],
          tipos_validaciones = { "CARTA INEGI":"string", "COO UTM Y": "number", "COO UTM X": "number", "DESCRIPCION":"string", "ENTIDAD":"string", "FIN":"string", "NOMBRE LOTE": "string", "TITULO": "number", "MUNICIPIO": "string", "VIGENCIA": "number", "SUPERFICIE": "number", "INICIO": "string", "TITULAR": "string" },
          valores = json_scatter["valores"];

      if (!json_scatter['ejex']) {
          alert("Error en la estructura del JSON: Se necesita especificar la unidad");
          return false;
      }

      if (!json_scatter['ejey']) {
          alert("Error en la estructura del JSON: Se necesita especificar la unidad");
          return false;
      }

      for (index_valor in valores) {
          var llaves_valor = Object.keys(valores[index_valor]);
          for (index_key in llaves_valor) {
              if (!keys_validaciones.some(elem => elem == llaves_valor[index_key])) {
                  alert("Error en la estructura del JSON: El campo " + llaves_valor[index_key] + " no esta permitido. Elemento: " + (parseInt(index_valor) + 1));
                  return false;
              }

              if (typeof valores[index_valor][llaves_valor[index_key]] !== tipos_validaciones[llaves_valor[index_key]]) {
                  alert("Error en la estructura del JSON: El campo " + llaves_valor[index_key] + " debe ser de tipo: " + tipos_validaciones[llaves_valor[index_key]] + ". Elemento: " + (parseInt(index_valor) + 1));
                  return false;
              }
          }
      }

      return true;
  }
