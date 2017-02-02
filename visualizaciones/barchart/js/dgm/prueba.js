

    //instantiate d3plus Treemap
    var visualization = d3plus.viz()
    .container("#viz") // container DIV to hold the visualization
    .data("partials/prueba.json")
    .id("ent") // key for which our data is unique on
    .type("bar") //visualization type
    //Rango de colores según valor
    .color({
      "heatmap": [ "#158a8c" , "#00cc99", "#34dab3" ],
      "value": "crect"
    })
    .x("ent")
    .y("crect")
    .font({ "family": "'Open Sans', Helvetica, Arial, sans-serif" })
    // .format({
    //   "text": function(text, params) {
    //
    //     if (text === "crect") {
    //       return jsonTreemap.unidad;
    //     }
    //     else {
    //       return d3plus.string.title(text, params);
    //     }
    //
    //   },
    //   "number": function(number, params) {
    //     var formattedFirst = d3plus.number.format(number, params);
    //     //var formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //     n = parseFloat(number).toFixed(1)
    //     var formatted = Number(n).toLocaleString('en');
    //     if (params.key == "crect") {
    //       return "$" + formatted;
    //     }
    //     else {
    //       return formatted + '%';
    //     }
    //   },
    //   "locale":"es_ES"
    // })
    .height(600)
    /*.labels({
      "align": "middle",
      "valign": "top",
      "number": function(number, params) {
        n = parseFloat(number).toFixed(1)
        var formatted = Number(n).toLocaleString('en');
      },
    })*/
    .resize(true)
    .draw()  //finally, draw the visualization!
