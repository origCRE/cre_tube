//--------------------
// global vars
//--------------------
var result_html_template = (
	'<div>' +
		'<h2 class="js-stuff-here">' +
		'</h2>' + 
		' <a class="js-anchor" href="https://www.google.com" target="_blank"><img class="js-thumb" src="" > </a> ' +
	'</div>'
);
//--------------------
// Data processing
//--------------------
function search(search_string){
    var api_key = "AIzaSyCsXylDINNp4MG3_C4ashxSZNjcwdhn6EY";

	var youtube_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + search_string +'&maxResults=5&key=' +api_key;

    $.ajax({
	  dataType: 'json',
      type: 'GET',
      url: youtube_url,
      success: onSuccess
	});
}
//--------------------
// Rendering...
//--------------------
function renderResult(result) {
	// work with the global var template...
	var template = $(result_html_template);
	vidID = result.id.videoId;
	vidURL = 'https://www.youtube.com/watch?v=' + vidID;
	console.log(vidURL);
	console.log(template);
	template.find(".js-stuff-here").text(result.snippet.title);
	template.find(".js-anchor").attr("href", vidURL);
	template.find(".js-thumb").attr("src", result.snippet.thumbnails.medium.url);
	return template;
}
function onSuccess(data){

	var results = data.items.map(function(item, index) {
    	//console.log(item.snippet.description);
	    return renderResult(item);
	});

	$('.js-search-results').html(results);
	console.log(data);
}
//--------------------
// Event Listeners...
//--------------------
$(document).ready(function() {
	$('.js-search-form').submit(function(event) {
		event.preventDefault();
        var search_field = $(event.currentTarget).find('.js-query');
        search(search_field.val());
        search_field.val("");
	});

});
