var spreadsheetID = "137F7EI84Q1dd8MK3Ao9IBpRHcf-9fVBRiMp-dEu9PXE";
var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

$.getJSON(url, function(data) {
  var datosVizPrincipal = data.feed.entry;
  $(datosVizPrincipal).each(function() {
    var tituloChart = this.gsx$titulo.$t;
    var tipoChart = this.gsx$tipo.$t;
    var idChart = this.gsx$id.$t;
    if (tipoChart == 'barra') {
      $('#chartBarra').append($('<option>', {
        value: idChart + ", #chartSubBarra",
        text: tituloChart
      }));
    } else if (tipoChart == 'sector') {
      $('#chartSector').append($('<option>', {
        value: idChart + ", #chartSubSector",
        text: tituloChart
      }));
    } else if (tipoChart == 'composicion') {
      $('#chartComposicion').append($('<option>', {
        value: idChart + ", #chartSubComposicion",
        text: tituloChart
      }));
    } else if (tipoChart == 'dispersion') {
      $('#chartDispersion').append($('<option>', {
        value: idChart + ", #chartSubDispersion",
        text: tituloChart
      }));
    }
  }); // termina EACH
});

$('.graficas').on('change', function() {
  getSubChart(this.options[this.selectedIndex].value);
});
//getSubChart("3, #chartSubBarra");

// genera las subgráficas de las gráficas padre
function getSubChart(idChart) {
  var url = "https://spreadsheets.google.com/feeds/list/137F7EI84Q1dd8MK3Ao9IBpRHcf-9fVBRiMp-dEu9PXE/2/public/full?alt=json";
  var array = idChart.split(",");
  $.getJSON(url, function(data) {
    var datosVizidChart = data.feed.entry;
    $(array[1]).empty(); // borra todas las opciones en el select
    $(datosVizidChart).each(function(i) {
      if (datosVizidChart[i].gsx$pkchart.$t == array[0]) {
        var tituloSubChart = datosVizidChart[i].gsx$titulo.$t;
        var idSubChart = datosVizidChart[i].gsx$idsubchart.$t;
        $(array[1]).removeAttr('disabled');
        $(array[1]).append($('<option>', {
          value: idSubChart,
          text: tituloSubChart
        }));
      }
    }); // termina EACH
  });
}
