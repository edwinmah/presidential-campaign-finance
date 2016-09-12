var Comparison = {
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

    Comparison.getData = getData.results;

    Comparison.one.index = 0;
    Comparison.two.index = 2;

    var datetime         = Comparison.getData[Comparison.one.index].date_coverage_to,
        dateCutoff       = new Date(datetime);

    $('.site-footer').find('.date-cutoff').attr('datetime', datetime)
    $('.site-footer').find('.date-cutoff').text(dateCutoff.toDateString());

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
Chart.defaults.global.defaultFontSize   = 14;
Chart.defaults.global.defaultFontColor  = '#222';
Chart.defaults.global.defaultFontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';
Chart.defaults.global.legend.display    = false;


// Bar chart
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
      xAxes: [{ ticks: { beginAtZero: true } }]
    }
  }
}

var barChart = new Chart(ctx, configBar);


// Create a new chart
function addBarChart(candidateAmt1, candidateAmt2, candidateLabel1, candidateLabel2, selection) {

  // add data to Chart.js dataset
  data.datasets[0].label = selection;
  data.labels            = [candidateLabel1, candidateLabel2];
  data.datasets[0].data  = [candidateAmt1, candidateAmt2];

  // remove previous chart
  barChart.destroy();

  // create new chart
  barChart = new Chart(ctx, configBar);

} // end addBarChart()


// Display comparison
function compareCandidates(selection) {

  // set-up variables
  switch (selection) {
    case "Cash on Hand" :
      var candidateAmt1       = roundNum(Comparison.getData[Comparison.one.index].cash_on_hand),
          candidateAmt2       = roundNum(Comparison.getData[Comparison.two.index].cash_on_hand);

      var candidateAmtCommas1 = addCommas(Comparison.getData[Comparison.one.index].cash_on_hand),
          candidateAmtCommas2 = addCommas(Comparison.getData[Comparison.two.index].cash_on_hand);
      break;

    case "Total Contributions" :
      var candidateAmt1       = roundNum(Comparison.getData[Comparison.one.index].total_contributions),
          candidateAmt2       = roundNum(Comparison.getData[Comparison.two.index].total_contributions);

      var candidateAmtCommas1 = addCommas(Comparison.getData[Comparison.one.index].total_contributions),
          candidateAmtCommas2 = addCommas(Comparison.getData[Comparison.two.index].total_contributions);
      break;

    case "Contributions under $200" :
      var candidateAmt1       = roundNum(Comparison.getData[Comparison.one.index].contributions_less_than_200),
          candidateAmt2       = roundNum(Comparison.getData[Comparison.two.index].contributions_less_than_200);

      var candidateAmtCommas1 = addCommas(Comparison.getData[Comparison.one.index].contributions_less_than_200),
          candidateAmtCommas2 = addCommas(Comparison.getData[Comparison.two.index].contributions_less_than_200);
      break;

    case "Contributions from $200 to 499" :
      var candidateAmt1       = roundNum(Comparison.getData[Comparison.one.index].contributions_200_499),
          candidateAmt2       = roundNum(Comparison.getData[Comparison.two.index].contributions_200_499);

      var candidateAmtCommas1 = addCommas(Comparison.getData[Comparison.one.index].contributions_200_499),
          candidateAmtCommas2 = addCommas(Comparison.getData[Comparison.two.index].contributions_200_499);
      break;

    case "Contributions from $500 to 1,499" :
      var candidateAmt1       = roundNum(Comparison.getData[Comparison.one.index].contributions_500_1499),
          candidateAmt2       = roundNum(Comparison.getData[Comparison.two.index].contributions_500_1499);

      var candidateAmtCommas1 = addCommas(Comparison.getData[Comparison.one.index].contributions_500_1499),
          candidateAmtCommas2 = addCommas(Comparison.getData[Comparison.two.index].contributions_500_1499);
      break;

    case "Contributions from $1,500 to 2,699" :
      var candidateAmt1       = roundNum(Comparison.getData[Comparison.one.index].contributions_1500_2699),
          candidateAmt2       = roundNum(Comparison.getData[Comparison.two.index].contributions_1500_2699);

      var candidateAmtCommas1 = addCommas(Comparison.getData[Comparison.one.index].contributions_1500_2699),
          candidateAmtCommas2 = addCommas(Comparison.getData[Comparison.two.index].contributions_1500_2699);
      break;

    case "Contributions at the maximum limit" :
      var candidateAmt1       = roundNum(Comparison.getData[Comparison.one.index].contributions_max),
          candidateAmt2       = roundNum(Comparison.getData[Comparison.two.index].contributions_max);

      var candidateAmtCommas1 = addCommas(Comparison.getData[Comparison.one.index].contributions_max),
          candidateAmtCommas2 = addCommas(Comparison.getData[Comparison.two.index].contributions_max);
      break;

    case "Total Receipts" :
      var candidateAmt1       = roundNum(Comparison.getData[Comparison.one.index].total_receipts),
          candidateAmt2       = roundNum(Comparison.getData[Comparison.two.index].total_receipts);

      var candidateAmtCommas1 = addCommas(Comparison.getData[Comparison.one.index].total_receipts),
          candidateAmtCommas2 = addCommas(Comparison.getData[Comparison.two.index].total_receipts);
      break;

    case "Total Disbursements" :
      var candidateAmt1       = roundNum(Comparison.getData[Comparison.one.index].total_disbursements),
          candidateAmt2       = roundNum(Comparison.getData[Comparison.two.index].total_disbursements);

      var candidateAmtCommas1 = addCommas(Comparison.getData[Comparison.one.index].total_disbursements),
          candidateAmtCommas2 = addCommas(Comparison.getData[Comparison.two.index].total_disbursements);
      break;

    case "Independent Expenditures – Support" :
      var candidateAmt1       = roundNum(Comparison.getData[Comparison.one.index].independent_expenditures_support),
          candidateAmt2       = roundNum(Comparison.getData[Comparison.two.index].independent_expenditures_support);

      var candidateAmtCommas1 = addCommas(Comparison.getData[Comparison.one.index].independent_expenditures_support),
          candidateAmtCommas2 = addCommas(Comparison.getData[Comparison.two.index].independent_expenditures_support);
      break;

    case "Independent Expenditures – Oppose" :
      var candidateAmt1       = roundNum(Comparison.getData[Comparison.one.index].independent_expenditures_oppose),
          candidateAmt2       = roundNum(Comparison.getData[Comparison.two.index].independent_expenditures_oppose);

      var candidateAmtCommas1 = addCommas(Comparison.getData[Comparison.one.index].independent_expenditures_oppose),
          candidateAmtCommas2 = addCommas(Comparison.getData[Comparison.two.index].independent_expenditures_oppose);
      break;
  } // end switch

  var candidateLabel1  = capitalize(Comparison.getData[Comparison.one.index].slug),
      candidateLabel2  = capitalize(Comparison.getData[Comparison.two.index].slug);

  var output  = '<dl>';
      output += '<dt><strong>' + candidateLabel1 + ':</strong></dt><dd>$' + candidateAmtCommas1 + '</dd>';
      output += '<dt><strong>' + candidateLabel2 + ':</strong></dt><dd>$' + candidateAmtCommas2 + '</dd>';
      output += '</dl>';

  // display amounts and selection
  $('#results').find('.results__title').text(selection);
  $('#result').html(output);

  // display bar chart
  addBarChart(candidateAmt1, candidateAmt2, candidateLabel1, candidateLabel2, selection);

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
