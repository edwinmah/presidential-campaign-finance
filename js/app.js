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
    Comparison.one.name  = Comparison.getData[Comparison.one.index].name;
    Comparison.one.party = Comparison.getData[Comparison.one.index].party;

    Comparison.two.index = 2;
    Comparison.two.name  = Comparison.getData[Comparison.two.index].name;
    Comparison.two.party = Comparison.getData[Comparison.two.index].party;

    $('.candidate1').text(Comparison.one.name);
    $('.candidate2').text(Comparison.two.name);

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


function addChart(candidateAmt1, candidateAmt2, candidateLabel1, candidateLabel2, selection) {

  // add data to Chart.js dataset
  data.labels[0]           = candidateLabel1;
  data.labels[1]           = candidateLabel2;
  data.datasets[0].label   = selection;
  data.datasets[0].data[0] = candidateAmt1;
  data.datasets[0].data[1] = candidateAmt2;

  barChart.destroy();

  barChart = new Chart(ctx, configBar);

} // end addChart


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

    case "Total Disbursements" :
      var candidateAmt1       = roundNum(Comparison.getData[Comparison.one.index].total_disbursements),
          candidateAmt2       = roundNum(Comparison.getData[Comparison.two.index].total_disbursements);

      var candidateAmtCommas1 = addCommas(Comparison.getData[Comparison.one.index].total_disbursements),
          candidateAmtCommas2 = addCommas(Comparison.getData[Comparison.two.index].total_disbursements);
      break;

    case "Total Receipts" :
      var candidateAmt1       = roundNum(Comparison.getData[Comparison.one.index].total_receipts),
          candidateAmt2       = roundNum(Comparison.getData[Comparison.two.index].total_receipts);

      var candidateAmtCommas1 = addCommas(Comparison.getData[Comparison.one.index].total_receipts),
          candidateAmtCommas2 = addCommas(Comparison.getData[Comparison.two.index].total_receipts);
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
  $('#results').find('.title').text(selection);
  $('#result').html(output);

  // display chart
  addChart(candidateAmt1, candidateAmt2, candidateLabel1, candidateLabel2, selection);

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


//  Comparison.getData[index].date_coverage_to;
//  Comparison.getData[index].contributions_200_499;
//  Comparison.getData[index].contributions_500_1499;
//  Comparison.getData[index].contributions_1500_2699;
//  Comparison.getData[index].contributions_less_than_200;
