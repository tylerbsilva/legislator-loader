// Initialize app as object
var tagSearch = {};

tagSearch.getTags = function(search){
  var params = {
    count: 20,
  };

  var url = "https://api.instagram.com/v1/tags/"+search+"/media/recent?client_id=357dd76e8bb5452e888dfca32bcae0db";

  var response = $.ajax({
    type: 'GET',
    url: url,
    data: params,
    dataType: 'jsonp'
  })
  .done(function(result){
    console.log(result.data);
  })
  .fail(function(){
    console.log('fail');
  });
};

tagSearch.populateImages = function(resultArray){
  var html = "";
  $.each(resultArray, function(index, element){
    html += "<li>";
    html += "<img src='" + element.images.standard_resolution.url + "' alt='" + element.caption.text + "' />";
    html += "<q>" + element.caption.text + "</q>";
    html += "<a href='http://instagram.com/" + element.user.username + "'><h3>" + element.user.full_name + "</h3></a>";
  });
};

$('#get-tag').submit(function(event){
  event.preventDefault();
  var search = $('#tagSubmission').val();
  tagSearch.getTags(search);
});


// When document loads, show this function
$(document).ready(function(){

});
