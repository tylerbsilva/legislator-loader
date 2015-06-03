// API KEY: 357dd76e8bb5452e888dfca32bcae0db

// Initialize app as object
var tagSearch = {};

tagSearch.getState = function(search){
  var params = {
    id:search,
    apikey:"037d0087348c68b5e9cca9d06f405461",
    output:"json"
  };

  var url = "http://www.opensecrets.org/api/?method=getLegislators";

  var response = $.ajax({
    type: 'GET',
    url: url,
    data: params,
    dataType: 'jsonp'
  })
  .done(function(result){
    console.log(result);
  })
  .fail(function(){
    console.log('fail');
  });
};

$('#get-state-leg').submit(function(event){
  event.preventDefault();
  var search = $('#states').val();
  congressApp.getState(search);
});


// When document loads, show this function
$(document).ready(function(){
  congressApp.populateStates();
});
