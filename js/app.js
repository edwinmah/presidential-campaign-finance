var Candidate = {
  one : {
    index : 0,
    name  : "",
    party : ""
  },
  two : {
    index : 0,
    name  : "",
    party : ""
  },
  getData : []
}


$.ajax({
  url: 'https://api.propublica.org/campaign-finance/v1/2016/president/totals.json',
  dataType: "json",
  type: "GET",
  beforeSend: function(xhr) {
    xhr.setRequestHeader('X-API-Key', 'tqIQ49k4JY7c2IczBaWGO5ApuGboqHhz6MtDhV6N')
  }
})
  .done(function(getData) {

    Candidate.getData = getData.results;

    Candidate.one.index = 0;
    Candidate.one.name  = Candidate.getData[Candidate.one.index].name;
    Candidate.one.party = Candidate.getData[Candidate.one.index].party;

    Candidate.two.index = 2;
    Candidate.two.name  = Candidate.getData[Candidate.two.index].name;
    Candidate.two.party = Candidate.getData[Candidate.two.index].party;

    $('.candidate1').text(Candidate.one.name);
    $('.candidate2').text(Candidate.two.name);

})
  .fail(function(jqXHR, error) {
    var errorElem = showError(error);
    $('#result').append(errorElem);
});

// takes error string and turns it into displayable DOM element
var showError = function(error){
  var errorElem = $('.error').clone();
  var errorText = '<p>' + error + '</p>';
  errorElem.append(errorText);
};


// Enter selected option into top label
$('.select-option').find('input').click(function() {

  // Get selection value
  var selection = $(this).val();

  // Change the text of checkbox label
  $(this).closest('.select').find('.toggle-label').text(selection);

  // Check the selected radio input
  $(this).prop('checked', true);

  // Uncheck the checkbox input
  $('.toggle').prop('checked', false);

  // Display the comparison
  compareCandidates(selection)

}); // end .select-option click


// Global values for Chart.js
Chart.defaults.global.defaultFontSize   = 16;
Chart.defaults.global.defaultFontColor  = '#222';
Chart.defaults.global.defaultFontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';
Chart.defaults.global.legend.display    = false;


// Chart.js
var ctx = $('#visuals');

var data = {
  labels: ['Clinton', 'Trump'],
  datasets: [
    {
      label: "Cash on Hand",
      backgroundColor: [
        'rgba(44, 77, 135, 0.6)',
        'rgba(182, 34, 32, 0.6)'
      ],
      borderColor: [
        'rgba(44, 77, 135, 0.6)',
        'rgba(182, 34, 32, 0.6)'
      ],
      borderWidth: 1,
      data: [58, 38]
    }
  ]
};

var configBar = {
  type: 'horizontalBar',
  data: data,
  options: {
    categoryPercentage: 1,
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
}

var barChart = new Chart(ctx, configBar);


function addChart(candidateAmt1, candidateAmt2, candidateLabel1, candidateLabel2, selection, barChart) {

  //ctx = $('#visuals');

  // add data to Chart.js dataset
  data.labels[0]           = candidateLabel1;
  data.labels[1]           = candidateLabel2;
  data.datasets[0].label   = selection;
  data.datasets[0].data[0] = candidateAmt1;
  data.datasets[0].data[1] = candidateAmt2;

  //barChart.update();

  barChart = new Chart(ctx, configBar);

} // end addChart


// Display comparison
function compareCandidates(selection) {

  // set-up variables
  switch (selection) {
    case "Cash on Hand" :
      var candidateAmt1       = roundNum(Candidate.getData[Candidate.one.index].cash_on_hand),
          candidateAmt2       = roundNum(Candidate.getData[Candidate.two.index].cash_on_hand);

      var candidateAmtCommas1 = addCommas(Candidate.getData[Candidate.one.index].cash_on_hand),
          candidateAmtCommas2 = addCommas(Candidate.getData[Candidate.two.index].cash_on_hand);
      break;

    case "Total Contributions" :
      var candidateAmt1       = roundNum(Candidate.getData[Candidate.one.index].total_contributions),
          candidateAmt2       = roundNum(Candidate.getData[Candidate.two.index].total_contributions);

      var candidateAmtCommas1 = addCommas(Candidate.getData[Candidate.one.index].total_contributions),
          candidateAmtCommas2 = addCommas(Candidate.getData[Candidate.two.index].total_contributions);
      break;

    case "Total Disbursements" :
      var candidateAmt1       = roundNum(Candidate.getData[Candidate.one.index].total_disbursements),
          candidateAmt2       = roundNum(Candidate.getData[Candidate.two.index].total_disbursements);

      var candidateAmtCommas1 = addCommas(Candidate.getData[Candidate.one.index].total_disbursements),
          candidateAmtCommas2 = addCommas(Candidate.getData[Candidate.two.index].total_disbursements);
      break;

    case "Total Receipts" :
      var candidateAmt1       = roundNum(Candidate.getData[Candidate.one.index].total_receipts),
          candidateAmt2       = roundNum(Candidate.getData[Candidate.two.index].total_receipts);

      var candidateAmtCommas1 = addCommas(Candidate.getData[Candidate.one.index].total_receipts),
          candidateAmtCommas2 = addCommas(Candidate.getData[Candidate.two.index].total_receipts);
      break;

    case "Independent Expenditures – Support" :
      var candidateAmt1       = roundNum(Candidate.getData[Candidate.one.index].independent_expenditures_support),
          candidateAmt2       = roundNum(Candidate.getData[Candidate.two.index].independent_expenditures_support);

      var candidateAmtCommas1 = addCommas(Candidate.getData[Candidate.one.index].independent_expenditures_support),
          candidateAmtCommas2 = addCommas(Candidate.getData[Candidate.two.index].independent_expenditures_support);
      break;

    case "Independent Expenditures – Oppose" :
      var candidateAmt1       = roundNum(Candidate.getData[Candidate.one.index].independent_expenditures_oppose),
          candidateAmt2       = roundNum(Candidate.getData[Candidate.two.index].independent_expenditures_oppose);

      var candidateAmtCommas1 = addCommas(Candidate.getData[Candidate.one.index].independent_expenditures_oppose),
          candidateAmtCommas2 = addCommas(Candidate.getData[Candidate.two.index].independent_expenditures_oppose);
      break;
  } // end switch

  var candidateLabel1  = capitalize(Candidate.getData[Candidate.one.index].slug),
      candidateLabel2  = capitalize(Candidate.getData[Candidate.two.index].slug);

  var output  = '<dl>';
      output += '<dt><strong>' + candidateLabel1 + ':</strong></dt><dd>$' + candidateAmtCommas1 + '</dd>';
      output += '<dt><strong>' + candidateLabel2 + ':</strong></dt><dd>$' + candidateAmtCommas2 + '</dd>';
      output += '</dl>';

  // display amounts and selection
  $('#results').find('.band__title').text(selection);
  $('#result').html(output);

  // display chart
  addChart(candidateAmt1, candidateAmt2, candidateLabel1, candidateLabel2, selection, barChart);

} // end compareCandidates()


// Round the numbers
function roundNum(number) {
  var factor = 1000000;
  return Math.round(number/factor);
} // end roundNum()


// Format numbers with commas
function addCommas(number) {
  return Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
} // end addCommas()


// Capitalize labels
function capitalize(slug) {
  return slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase()
}


//  Candidate.getData[index].date_coverage_to;
//  Candidate.getData[index].contributions_200_499;
//  Candidate.getData[index].contributions_500_1499;
//  Candidate.getData[index].contributions_1500_2699;
//  Candidate.getData[index].contributions_less_than_200;
