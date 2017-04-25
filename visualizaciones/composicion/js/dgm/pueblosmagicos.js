//instantiate d3plus Treemap
var visualization = d3plus.viz()
.container("#treemapd3") // container DIV to hold the visualization
.data("partials/dgm/pueblosmagicos.json")
.id(["estado", "municipio"]) // key for which our data is unique on
.type("tree_map") //visualization type
.size("valor") //sizing of blocks
//Rango de colores según valor
.color({
    "heatmap": ["#6985d0", "#f7d360", "#ec6d65"],
    "scale": ["#6985d0", "#f7d360", "#ec6d65"],
    "value": "valor"
})
.font({
    "family": "'Open Sans', Helvetica, Arial, sans-serif",
    "size": 14
})
.format({
    "text": function(text, params) {
        if (text === "valor") {
            return "Pueblo Mágico";
        } else {
            return d3plus.string.title(text, params);
        }
    },
    "number": function(number, params) {
        var formattedFirst = d3plus.number.format(number, params);
        //var formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        n = parseFloat(number).toFixed(1)
        var formatted = Number(n).toLocaleString('en');
        if (params.key == "valor") {
            return formatted;
        }
        else {
            return formatted + '%';
        }
    },
    "locale": "es_ES"
})
.resize(true)
.ui({
    "padding": 15
})
.legend(false)
.draw() //finally, draw the visualization
