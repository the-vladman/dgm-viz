d3plus.viz()
    .container("#viz")
 .data("partials/20.json")

    .type("pie")
    .id(["tipo", "ambito"])
    .size("valor")
    .color({
        "heatmap": ["#34DAB3","#30D1AE","#2DC8AA","#29BFA6","#26B6A1","#22AD9D","#1FA499","#1B9B94","#189290","#158A8C"],
        "value": "valor"
    })
    .legend(false)
    .font({ "family": "'Open Sans', Helvetica, Arial, sans-serif", "size": 14 })
    .format({
        "text": function(text, params) {
            if (text === "valor") {
                return "Centros de Trabajo";
            } else {
                return d3plus.string.title(text, params);
            }
        },
        "number": function(number, params) {
            n = parseFloat(number).toFixed(2)
            var formatted = Number(n).toLocaleString('en');
            if (params.key == "valor") {
                //return "$" + formatted;
                return formatted;
            } else {
                return formatted + '%';
            }
        },
        "locale": "es_ES"
    })
    .resize(true)
    .draw()
