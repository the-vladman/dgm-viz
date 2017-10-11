$.getJSON("https://spreadsheets.google.com/feeds/list/137F7EI84Q1dd8MK3Ao9IBpRHcf-9fVBRiMp-dEu9PXE/od6/public/values?alt=json", function(data) {
  //first row "title" column
  console.log(data.feed.entry[0]['gsx$nombre']['$t']);
});
