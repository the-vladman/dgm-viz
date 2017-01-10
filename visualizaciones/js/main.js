var switcher$ = $('.graficas'),
    switchTarget$ = $('#marcoVisualizaciones');
switchTarget$.attr('src', switcher$.val());
getInfoChart(document.getElementById('chartBarra').options[0].text);
$('#btnDescargar').prop('disabled', true);
$('.graficas').on('change', function() {
    $("#compartir").hide();
    document.getElementById('marcoVisualizaciones').src = this.options[this.selectedIndex].value;
    getInfoChart(this.options[this.selectedIndex].text);
});

function getInfoChart(var1) {
    var grafica = var1;
    if (grafica.match(/Población media Total.*/)) {
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
    } else if (grafica.match(/Calidad general del agua.*/)) {
        descripcion = "Contiene las principales variables para medir la calidad del agua por sitio, cuenca, estado. A su vez indica el tipo de sistema ambiental que se mide.<br>Fuente: Conagua http://201.116.60.25/sina/index_jquery-mobile2.html?tema=calidadAgua";
        datos = ["Red Nacional de Monitoreo de la Calidad de las Aguas Nacionales", "CONAGUA", "XLS"]
    } else if (grafica.match(/Escuelas por Estado.*/)) {
        descripcion = "Contiene datos sobre escuelas a nivel estatal donde se incluye información respectiva sobre el nombre de la escuela, domicilio,  localización, tipo de sostenimiento de la escuela, así como nivel y tipo de educación.<br>Fuente: Sep  http://www.snie.sep.gob.mx/estadisticas_educativas.html ";
        datos = ["Matrícula por Institución y Entidad Federativa", "SEP", "CSV"]
    } else if (grafica.match(/Inscritos en RETC.*/)) {
        descripcion = "";
        datos = ["Registro de Emisiones y Transferencia de Contaminantes", "SEMARNAT", "XLS"]
    } else if (grafica.match(/Llegadas a hoteles.*/)) {
        descripcion = "Resultados de las variables de las actividades de alojamiento en las entidades federativas del país; con información sobre ocupación hotelera y llegada de turistas a hotel";
        datos = ["Actividad Hotelera por Entidad Federativa", "SECTUR", "CSV"]
    } else if (grafica.match(/pueblos magicos.*/)) {
        descripcion = "Tabla de las localidades que cuentan con el nombramiento de Pueblo Mágico por Estado y año de incorporación al Programa";
        datos = ["Localidades que cuentan con el nombramiento de Pueblo Mágico", "SECTUR", "XLS"]
    } else if (grafica.match(/Población por estado.*/)) {
        descripcion = "Serie del valor del Índice de Rezago Social a nivel nacional y estatal";
        datos = ["Índice de Rezago Social,2000-2010 (nacional,estatal,municipal, localidad y ageb)", "CONEVAL", "CSV"]
    } else if (grafica.match(/Residuos solidos.*/)) {
        descripcion = "Tabla con total de puntos muestreados, % eficiencia de cloración, % cobertura de vigilancia, % población con cobertura de vigilancia, % muestras aptas para consumo, % dentro y...";
        datos = ["Calidad del agua de uso y consumo humano", "COFEPRIS", "XLS"]
    } else if (grafica.match(/Proyecciones de los hogares.*/)) {
        descripcion = "En esta sección se presenta la información sobre los datos, metodología y análisis de los resultados de las estimaciones demográficas para el periodo 1990-2010 y las proyecciones de población para el horizonte 2010-2030. Dicha información es necesaria y relevante para llevar a cabo la planeación demográfica, económica y social del país, al mismo tiempo que presenta una herramienta de conocimiento valiosa para estimar múltiples requerimientos futuros en servicios e infraestructura, así como otras necesidades sociales.";
        datos = ["Proyecciones de la población de México", "CONAPO", "JSON"]
    } else if (grafica.match(/Proyecciones de los hogares índigenas.*/)) {
        descripcion = "En esta sección se presenta la información sobre los datos, metodología y análisis de los resultados de las estimaciones demográficas de los hogares indígenas en México para el periodo 2010-2020  Dicha información es necesaria y relevante para llevar a cabo la planeación demográfica, económica y social del país, al mismo tiempo que presenta una herramienta de conocimiento valiosa para estimar múltiples requerimientos futuros en servicios e infraestructura, así como otras necesidades sociales.";
        datos = ["Proyecciones de la población de México", "CONAPO", "JSON"]
    } else if (grafica.match(/Tasa específica de fecundidad.*/)) {
        descripcion = "El más reciente ejercicio de prospectiva realizado por el Conapo ofrece insumos valiosos para describir la situación actual de la dinámica demográfica. El conocimiento de los cambios en la esperanza de vida, la estructura demográfica de la mortalidad, el potencial que ofrece el bono demográfico, el envejecimiento, los niveles y calendario de la fecundidad, son insumos para afrontar los diversos retos que en este campo se imponen a la sociedad y el Estado mexicano.";
        datos = ["Proyecciones de la población de México", "CONAPO", "JSON"]
    } else if (grafica.match(/Emigrantes.*/)) {
        descripcion = "El ejercicio representa una estimación de personas que se van de la entidad, con un  horizonte de proyección para la República Mexicana  hasta 2050 y para las Entidades Federativas hasta 2030.";
        datos = ["Proyecciones de la población de México", "CONAPO", "JSON"]
    } else if (grafica.match(/Inmigrantes.*/)) {
        descripcion = "Estimación de personas que llegan a la entidad donde el horizonte de proyección para la República Mexicana es hasta 2050 y para las Entidades Federativas hasta 2030. <br>Fuente: Conapo  http://www.conapo.gob.mx/work/models/CONAPO/Proyecciones/Datos/Bases_de_Datos/Indicadores_demograficos/Descriptor/Diccionario_Emigrantes_Interestatales.csv ";
        datos = ["Proyecciones de la población de México", "CONAPO", "JSON"]
    } else if (grafica.match(/Defunciones.*/)) {
        descripcion = "Estimación de fallecimientos en la República Mexicana (1990-2050) y Entidades Federativas (1990-2030).<br>Fuente: Conapo http://www.conapo.gob.mx/work/models/CONAPO/Proyecciones/Datos/Bases_de_Datos/Indicadores_demograficos/Descriptor/Diccionario_Defunciones.csv ";
        datos = ["Proyecciones de la población de México", "CONAPO", "JSON"]
    } else if (grafica.match(/Por localidad.*/)) {
        descripcion = "Representa proyecciones de crecimiento de la población por localidad de 2010 a 2030.<br>Fuente: Conapo http://www.conapo.gob.mx/work/models/CONAPO/Proyecciones/Datos/Bases_de_Datos/Proyecciones_Localidades/Descriptor/Diccionario_Proyecciones_por_Localidad.csv";
        datos = ["Proyecciones de la población de México", "CONAPO", "JSON"]
    } else if (grafica.match(/Municipios 2010.*/)) {
        descripcion = "Representa proyecciones de crecimiento de la  Población a nivel Municipal del año  2010 - 2030.<br>Fuente: Conapo http://www.conapo.gob.mx/work/models/CONAPO/Proyecciones/Datos/Bases_de_Datos/Proyecciones_Municipios/Descriptor/Diccionario_Proyecciones_por_Municipios.csv ";
        datos = ["Proyecciones de la población de México", "CONAPO", "JSON"]
    } else if (grafica.match(/Catálogo Centros de Trabajo.*/)) {
        descripcion = "Unidad mínima de responsabilidad que tiene como propósito general ordenar y sistematizar la información que servirá a las autoridades para tomar decisiones acerca de los recursos humanos, financieros y materiales y para llevar el control escolar de los servicios que se van a proporcionar.<br>Fuente: SEP http://www.rname.sep.gob.mx/SIGED/glosario/index.html ";
        datos = ["Catálogo de Centros de Trabajo", "SEP", "XLS"]
    } else if (grafica.match(/Matrícula por Institución.*/)) {
        descripcion = "Muestra información por institución educativa respecto al nivel de educación superior, la cual se se imparte después del bachillerato o de sus equivalentes. Está compuesta por la licenciatura, la especialidad, la maestría y el doctorado, así como por opciones terminales públicas o privadas.<br>Fuente: Sep. http://www.rname.sep.gob.mx/SIGED/glosario/index.html ";
        datos = ["Matrícula por Institución y Entidad Federativa por clave de centro de trabajo", "SEP", "CSV"]
    } else if (grafica.match(/Agua de Consumo Humano.*/)) {
        descripcion = "Tabla con total de puntos muestreados, porcentaje de eficiencia de cloración, porcentaje de cobertura de vigilancia, porcentaje de población con cobertura de vigilancia, porcentaje de muestras aptas para consumo, porcentaje dentro y arriba de NOM. Por cada Entidad Federativa.<br>Fuente: Cofepris http://www.cofepris.gob.mx/Paginas/Inicio.aspx ";
        datos = ["Calidad del agua de uso y consumo humano.", "COFEPRIS", "XLS"]
    } else if (grafica.match(/Concesión minera.*/)) {
        descripcion = "Las concesiones mineras otorgan a sus titulares el derecho a explotar, explotar y beneficiar todas las sustancias concesibles que se localicen dentro del lote minero que amparen.<br>http://www.siam.economia.gob.mx/work/models/siam/Resource/Avisos/Fund_basicos_conc_min.pdf";
        datos = ["Concesiones Mineras", "SE", "CSV"]
    } else {
        descripcion = "";
        datos = ["", "", ""];
    }
    $("#descripcion").html("");
    $("#descripcion").append(descripcion);
    $("#nombreDato").html("");
    $("#institucionDato").html("");
    $("#tipoDato").html("");
    document.getElementById("nombreDato").innerHTML = datos[0];
    document.getElementById("institucionDato").innerHTML = datos[1];
    document.getElementById("tipoDato").innerHTML = datos[2];
    $("#tipoDato").attr("data-format", datos[2]);
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) { // Desactiva descargar en gráficas de BARRAS
        if ($('#pillBar').hasClass('active')) {
            $('#btnDescargar').prop('disabled', true);
        } else {
            $('#btnDescargar').prop('disabled', false);
        }
    });
}
document.getElementById("btnDescargar").addEventListener("click", function() {
    var baseElement = document.getElementById('marcoVisualizaciones').contentWindow.document.querySelector('body');
    document.getElementById("output").innerHTML = (baseElement.querySelector("div").innerHTML);
    var url = document.getElementById("marcoVisualizaciones").contentWindow.location.href;
    var filename = url.match(/([^\/]+)(?=\.\w+$)/)[0];
    saveSvgAsPng(document.querySelector('svg'), filename + ".png");
});
$('#tipoGrafica').on('click', function() {
    $("#compartir").hide();
});
$("#btnEmbeber").click(function() {
    $("#compartir").empty();
    $("#compartir").fadeToggle("slow", function() {
        var fuente = $('#marcoVisualizaciones').contents().get(0).location.href;
        $("#compartir").text('<iframe src="' + fuente + '" frameborder="0" scrolling="no" style="overflow: hidden; width: 100%; height: 600px;">');
    });
});