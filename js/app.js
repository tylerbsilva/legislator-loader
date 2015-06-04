// Initialize app as object
var tagSearch = {};

tagSearch.getTags = function(search) {
  var params = {
    count: 20,
  };
  search = tagSearch.removeHashtag(search);
  var url = "https://api.instagram.com/v1/tags/" + search + "/media/recent?client_id=357dd76e8bb5452e888dfca32bcae0db";
  var response = $.ajax({
      type: 'GET',
      url: url,
      data: params,
      dataType: 'jsonp'
    })
    .done(function(result) {
      //console.log(result);
      tagSearch.populateImages(result.data);
    })
    .fail(function(response) {
      tagSearch.failed(response.error_message);
    });
};

// Pushing the data retreived to the DOM
tagSearch.populateImages = function(resultArray) {
  var html = "";
  $.each(resultArray, function(index, element) {
    html += "<li>";
    html += "<img src='" + element.images.standard_resolution.url + "' alt='" + element.caption.text + "' />";
    html += "<blockquote>" + element.caption.text + "</blockquote>";
    html += "<a href='http://instagram.com/" + element.user.username + "'><h3>&#64;" + element.user.username + "</h3></a>";
    html += "</li>";
  });
  $(".resultsList").append(html);
};

// Remove Hash symbol from
tagSearch.removeHashtag = function(searchTerm) {
  // Remove space if there is one
  searchTerm = searchTerm.replace(/ /g, "");

  // Remove # if at the beginning of the search term
  if (searchTerm.charAt(0) == "#" || searchTerm.charAt(0) == "&#35;") {
    searchTerm = searchTerm.substr(1);
    return searchTerm;
  } else {
    return searchTerm;
  }
};

// display error message if failed
tagSearch.failed = function(error){
  var html = "<p>I'm sorry, we're experienceing issues with Instagram right now</p><p>Message: " + error + "</p>";
  $(".resultsList").append(html);
};


// When document loads, show this function
$(document).ready(function() {
  // On submit of form
  $('#get-tag').submit(function(event) {
    event.preventDefault();
    // Clear the list
    $('.resultsList').empty();
    // Grab search tag
    var search = $('#tagSubmission').val();
    // Clear search box
    $('#tagSubmission').val("");
    // Run the search through the function to grab tags
    tagSearch.getTags(search);
  });
});
