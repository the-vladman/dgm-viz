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
$(document).ready(function() {
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
