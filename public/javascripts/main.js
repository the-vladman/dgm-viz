var spreadsheetID = "137F7EI84Q1dd8MK3Ao9IBpRHcf-9fVBRiMp-dEu9PXE";
var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

$.getJSON(url, function(data) {
  var datosVizPrincipal = data.feed.entry;
  $(datosVizPrincipal).each(function() {
    var tituloChart = this.gsx$titulo.$t;
    var tipoChart = this.gsx$tipo.$t;
    var idChart = this.gsx$id.$t;
    var urlChart = this.gsx$url.$t;
    var visibleChart = this.gsx$visible.$t;
    if (visibleChart == 'si') {
      if (urlChart != '') {
        $(".subGraficas").empty();
        //$(".subGraficas").prop("disabled", true);
        switch (tipoChart) {
          case 'barra':
            $('#chartBarra').append($('<option>', {
              value: urlChart,
              text: tituloChart
            }));
            break;
          case 'sector':
            $('#chartSector').append($('<option>', {
              value: urlChart,
              text: tituloChart
            }));
            break;
          case 'composicion':
            $('#chartComposicion').append($('<option>', {
              value: urlChart,
              text: tituloChart
            }));
            break;
          case 'dispersion':
            $('#chartDispersion').append($('<option>', {
              value: urlChart,
              text: tituloChart
            }));
            break;
          case 'mapa':
            $('#chartMapa').append($('<option>', {
              value: urlChart,
              text: tituloChart
            }));
            break;
          default:
            console.log("Opción desconocida: " + idChart)
        }
      } else {
        switch (tipoChart) {
          case 'barra':
            $('#chartBarra').append($('<option>', {
              value: idChart + ", #chartSubBarra",
              text: tituloChart
            }));
            break;
          case 'sector':
            $('#chartSector').append($('<option>', {
              value: idChart + ", #chartSubSector",
              text: tituloChart
            }));
            break;
          case 'composion':
            $('#chartComposicion').append($('<option>', {
              value: idChart + ", #chartSubComposicion",
              text: tituloChart
            }));
            break;
          case 'dispersion':
            $('#chartDispersion').append($('<option>', {
              value: idChart + ", #chartSubDispersion",
              text: tituloChart
            }));
            break;
          case 'mapa':
            $('#chartMapa').append($('<option>', {
              value: idChart + ", #chartSubMapa",
              text: tituloChart
            }));
            break;
          default:
            console.log("Opción desconocida: " + idChart)
        }
      }
    } // IF que valida si es visible
  }); // termina EACH
});

// genera las subgráficas de las gráficas principales
function getSubChart(idChart) {
  var url = "https://spreadsheets.google.com/feeds/list/137F7EI84Q1dd8MK3Ao9IBpRHcf-9fVBRiMp-dEu9PXE/2/public/values?alt=json";
  var array = idChart.split(",");
  $.getJSON(url, function(data) {
    var datosVizidChart = data.feed.entry;
    $(array[1]).empty(); // borra todas las opciones en el select
    var j = 0;
    $(datosVizidChart).each(function(i) {
      if (datosVizidChart[i].gsx$pkchart.$t == array[0]) {
        var tituloSubChart = datosVizidChart[i].gsx$titulo.$t;
        var urlIframe = datosVizidChart[i].gsx$url.$t;
        $(array[1]).prop("disabled", false);
        $(array[1]).append($('<option>', {
          value: urlIframe,
          text: tituloSubChart
        }));
        if (j === 0) {
          document.getElementById('marcoVisualizaciones').src = urlIframe;
        }
        j++;
      }
    }); // termina EACH
  });
}

function detectIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }
  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }
  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }
  // other browser
  return false;
}
$(document).ready(function() {
  var version = detectIE();
  if (version === false) {
    $("#btnDescargar").show();
  } else {
    $("#btnDescargar").hide();
  }
  $("#btnEmbeber").click(function() {
      $("#compartir").empty();
      $("#compartir").fadeToggle("slow", function() {
        var fuente = $('#marcoVisualizaciones').contents().get(0).location.href + "?muestra=td";
        $("#compartir").text('<iframe src="' + fuente + '" frameborder="0" scrolling="no" style="overflow: hidden; width: 100%; height: 700px;"></iframe>');
      });
    }

  );
  $("#btnDescargar").click(function() {
    var baseElement = document.getElementById('marcoVisualizaciones').contentWindow.document.querySelector('body');
    document.getElementById("output").innerHTML = (baseElement.querySelector("div").innerHTML);
    var url = document.getElementById("marcoVisualizaciones").contentWindow.location.href;
    var filename = url.match(/([^\/]+)(?=\.\w+$)/)[0];
    saveSvgAsPng(document.querySelector('svg'), filename + ".png");
  });
  getSubChart("1, #chartSubBarra"); // carga la primera gráfica al carga la página
  $('.graficas').on('change', function() {
    getSubChart(this.options[this.selectedIndex].value);
  });
  $('.subGraficas').change(function() {
    document.getElementById('marcoVisualizaciones').src = $(this).val();
  });
  $("ul#tipoGrafica li a").click(function() {
    var idDivChart = $(this).attr('aria-controls');
    $('#' + idDivChart).prop('selectedIndex', 0);
    var primerChart = $('#chart' + idDivChart).find("option:first-child").val();
    getSubChart(primerChart);
  });
});
