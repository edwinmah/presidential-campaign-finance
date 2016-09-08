var Candidate = {
  index: 0,
  name : "",
  party: "",
  getData : []
}


// set-up URL
var urlJSON = 'https://api.propublica.org/campaign-finance/v1/2016/president/totals.json';

$.ajax({
  url: urlJSON,
  dataType: "json",
  type: "GET",
  beforeSend: function(xhr) {
    xhr.setRequestHeader('X-API-Key', 'tqIQ49k4JY7c2IczBaWGO5ApuGboqHhz6MtDhV6N')
  }
})
  .done(function(data){

    //Candidate.getData.push(data.results);
    Candidate.getData = data.results;

})
  .fail(function(jqXHR, error){
    var errorElem = showError(error);
    $('#visual').append(errorElem);
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

  //console.log(selection);

  // Check the selected radio input
  $(this).prop('checked', true);

  // Uncheck the checkbox input
  $('.toggle').prop('checked', false);

  // Display the visual
  switch (selection) {
    case "Cash on Hand" :
      cash();
      break;

    case "Total Receipts" :
      receipts();
      break;

    case "Total Contributions" :
      contributions();
      break;

    case "Total Disbursements" :
      disbursements();
      break;

    case "Independent Expenditures Oppose" :
      indepExpendOppose();
      break;

    case "Independent Expenditures Support" :
      indepExpendSupport();
      break;
  }
console.log(Candidate.getData)
});


// Cash on Hand
function cash() {
  var cashClinton  = Math.round(Candidate.getData[0].cash_on_hand).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  var cashTrump    = Math.round(Candidate.getData[2].cash_on_hand).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  var output  = '<p>Clinton: ' + cashClinton + '</p>';
      output += '<p>Trump: '   + cashTrump   + '</p>';

  $('#results').find('.band__title').text('Cash on Hand');
  $('#visual').html(output);
}


// Total Receipts
function receipts() {
  var receiptsClinton  = Math.round(Candidate.getData[0].total_receipts).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  var receiptsTrump    = Math.round(Candidate.getData[2].total_receipts).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  var output  = '<p>Clinton: ' + receiptsClinton + '</p>';
      output += '<p>Trump: '   + receiptsTrump   + '</p>';

  $('#results').find('.band__title').text('Total Receipts');
  $('#visual').html(output);
}


// Total Contributions
function contributions() {
  var contributionsClinton  = Math.round(Candidate.getData[0].total_contributions).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  var contributionsTrump    = Math.round(Candidate.getData[2].total_contributions).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  var output  = '<p>Clinton: ' + contributionsClinton + '</p>';
      output += '<p>Trump: '   + contributionsTrump   + '</p>';

  $('#results').find('.band__title').text('Total Contributions');
  $('#visual').html(output);
}


// Total Disbursements
function disbursements() {
  var disbursementsClinton  = Math.round(Candidate.getData[0].total_disbursements).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  var disbursementsTrump    = Math.round(Candidate.getData[2].total_disbursements).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  var output  = '<p>Clinton: ' + disbursementsClinton + '</p>';
      output += '<p>Trump: '   + disbursementsTrump   + '</p>';

  $('#results').find('.band__title').text('Total Disbursements');
  $('#visual').html(output);
}


// Independent Expenditures – Oppose
function indepExpendOppose() {
  var indepExpendOpposeClinton  = Math.round(Candidate.getData[0].independent_expenditures_oppose).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  var indepExpendOpposeTrump    = Math.round(Candidate.getData[2].independent_expenditures_oppose).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  var output  = '<p>Clinton: ' + indepExpendOpposeClinton + '</p>';
      output += '<p>Trump: '   + indepExpendOpposeTrump   + '</p>';

  $('#results').find('.band__title').text('Independent Expenditures – Oppose');
  $('#visual').html(output);
}


// Independent Expenditures – Support
function indepExpendSupport() {
  var indepExpendSupportClinton  = Math.round(Candidate.getData[0].independent_expenditures_support).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  var indepExpendSupportTrump    = Math.round(Candidate.getData[2].independent_expenditures_support).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  var output  = '<p>Clinton: ' + indepExpendSupportClinton + '</p>';
      output += '<p>Trump: '   + indepExpendSupportTrump   + '</p>';

  $('#results').find('.band__title').text('Independent Expenditures – Support');
  $('#visual').html(output);
}


//  Candidate.getData[index].date_coverage_to;
//  Candidate.getData[index].contributions_200_499;
//  Candidate.getData[index].contributions_500_1499;
//  Candidate.getData[index].contributions_1500_2699;
//  Candidate.getData[index].contributions_less_than_200;
