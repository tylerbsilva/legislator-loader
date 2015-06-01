// Initialize app as object
var congressApp = {};

// State Array
congressApp.states = ["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"];

// Load States into DOM
congressApp.populateStates = function(){
  var html = "";
  $.each(congressApp.states, function(index, item){
    html += "<option>" + item + "</option>";
  });
  $('#states').html(html);
};


congressApp.getState = function(search){
  var params = {
    id: stateAbrv,
    apikey: "037d0087348c68b5e9cca9d06f405461",
    output: "json"
  };

  url = "http://www.opensecrets.org/api/?method=getLegislators";

  $.getJSON(url, params, function(response){
    console.log(response);
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
