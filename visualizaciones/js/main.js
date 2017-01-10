var switcher$ = $('.graficas'),
switchTarget$ = $('#marcoVisualizaciones');
switchTarget$.attr('src', switcher$.val());
getInfoChart(document.getElementById('chartBarra').options[0].text);


$('.graficas').on('change', function() {
    $( "#compartir" ).hide();
    document.getElementById('marcoVisualizaciones').src = this.options[this.selectedIndex].value;
    getInfoChart(this.options[this.selectedIndex].text);
});

function getInfoChart(var1) {
    var grafica = var1;
    if (grafica.match(/Población media total.*/)) {
        descripcion = "Conjunto de indicadores que muestran un panorama general del cambio en la estructura y dinámica de la población así como en las tendencias y niveles de los fenómenos demográficos en México y las entidades federativas, entre los que encontramos esperanzas de vida, tasas demográficas, entre varios.<br><i>Fuente: Conapo http://www.conapo.gob.mx/en/CONAPO/Indicadores</i>";
        datos = ["Proyecciones de la población de México", "CONAPO", "JSON"];
    } else if (grafica.match(/Nacimientos Anuales.*/)) {
        descripcion = "El más reciente ejercicio de prospectiva realizado por el Conapo ofrece insumos valiosos para describir la situación actual de la dinámica demográfica. El conocimiento de los cambios en la esperanza de vida, la estructura demográfica de la mortalidad, el potencial que ofrece el bono demográfico, el envejecimiento, los niveles y calendario de la fecundidad, son insumos para afrontar los diversos retos que en este campo se imponen a la sociedad y el Estado mexicano.<br>Fuente: Conapo http://www.conapo.gob.mx/work/models/CONAPO/Resource/1720/1/images/1_La_Situacion_Demografica_En_Mexico.pdf ";
        datos = ["Proyecciones de la población de México", "CONAPO", "JSON"];
    } else if (grafica.match(/rezago.*/)) {
        descripcion = "El Índice de Rezago Social (IRS) permite ordenar las entidades federativas y municipios  de mayor a menor grado de rezago social en un momento del tiempo. <br>Es una medida en la que un solo índice agrega variables de educación, de acceso a servicios de salud, de servicios básicos en la vivienda, de calidad y espacios en la misma, y de activos en el hogar. Es decir, proporciona el resumen de cuatro carencias sociales de la medición de pobreza del CONEVAL: rezago educativo, acceso a los servicios de salud, acceso a los servicios básicos en la vivienda y la calidad y espacios en la vivienda.";
        datos = ["Índice de Rezago Social,2000-2010 (nacional,estatal,municipal, localidad y ageb)", "CONEVAL", "CSV"];
    } else if (grafica.match(/Crecimiento.*/)) {
        descripcion = "El Índice de Rezago Social (IRS) permite ordenar las entidades f1ederativas y municipios  de mayor a menor grado de rezago social en un momento del tiempo. <br>Es una medida en la que un solo índice agrega variables de educación, de acceso a servicios de salud, de servicios básicos en la vivienda, de calidad y espacios en la misma, y de activos en el hogar. Es decir, proporciona el resumen de cuatro carencias sociales de la medición de pobreza del CONEVAL: rezago educativo, acceso a los servicios de salud, acceso a los servicios básicos en la vivienda y la calidad y espacios en la vivienda.";
        datos = ["Proyecciones de la población de México", "CONAPO", "JSON"]
    } else if (grafica.match(/Esperanza de vida.*/)) {
        descripcion = "Conjunto de indicadores que muestran un panorama general del cambio en la estructura y dinámica de la población así como en las tendencias y niveles de los fenómenos demográficos en México y las entidades federativas, entre los que encontramos esperanzas de vida, tasas demográficas, entre varios.";
        datos = ["Proyecciones de la población de México", "CONAPO", "JSON"]
    } else if (grafica.match(/Esperanza de vida.*/)) {
        descripcion = "";
        datos = ["Proyecciones de la población de México", "CONAPO", "JSON"]
    } else {
        descripcion = "No disponible";
        datos = ["No disponible", "No disponible", ""];
    }
    $("#descripcion").html("");
    $("#descripcion").append(descripcion);
    $("#nombreDato").html("");
    $("#institucionDato").html("");
    $("#tipoDato").html("");
    document.getElementById("nombreDato").innerHTML = datos[0];
    document.getElementById("institucionDato").innerHTML = datos[1];
    document.getElementById("tipoDato").innerHTML = datos[2];
    $( "#tipoDato" ).attr( "data-format", datos[2] );
}
$('#tipoGrafica').on('click', function() {
  $( "#compartir" ).hide();
});

$( "#btnEmbeber" ).click(function() {
    $( "#compartir" ).empty();
    $( "#compartir" ).fadeToggle("slow", function() {
        var fuente = $('#marcoVisualizaciones').contents().get(0).location.href;
        $( "#compartir" ).text('<iframe src="'+ fuente +'" frameborder="0" scrolling="no" style="overflow: hidden; width: 100%; height: 600px;">');
    });
});
document.getElementById("btnDescargar").addEventListener("click", function () {
    var baseElement = document.getElementById('marcoVisualizaciones').contentWindow.document.querySelector('body');
    document.getElementById("output").innerHTML = (baseElement.querySelector("div").innerHTML);
    var url = document.getElementById("marcoVisualizaciones").contentWindow.location.href;
    var filename = url.match(/([^\/]+)(?=\.\w+$)/)[0];
        saveSvgAsPng(document.querySelector('svg'), filename+".png");
});