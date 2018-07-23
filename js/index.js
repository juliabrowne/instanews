$(document).ready(function () {

  $('#sections').on('change', function () {

    //variable for loading gif
    var loader = '<div class="loading-gif">';
    loader += '<img src="../../images/ajax-loader.gif" alt="Loading Gif">';
    loader += '</div>';

    //variable for header change when "Sections..." is selected
    var selectedStory = $('#sections').val();
      if (selectedStory === ' ') {
        location.reload();
      }

    $('.header').addClass('header-change');

    $('.article-grid').empty(); //this clears the content
    $('.article-grid').append(loader);

    //url for API request
    var url = 'https://api.nytimes.com/svc/topstories/v2/' + selectedStory + '.json';
    url +=
      '?' + $.param({
        'api-key': '7c08d5d706ea4a07a18b431e666a976f'
      });

    //ajax request
    $.ajax({
        url: url,
        method: 'GET'
      })
      //data.results are filtered to only show articles that have images
      .done(function (data) {
        var filterResults = data.results.filter(function (result) {
          return result.multimedia;
        }).slice(0, 12);

        $.each(filterResults, function (key, value) {
          var artLink = value.url; //variable for link
          var artImg = value.multimedia[4].url; //variable for image
          var artText = value.abstract; //variable for text
          var html = '<div class="new-cell">';

          html += '<a href="' + artLink + '">';
          html += '<div class="bg-img" style="background-image: url(' + artImg + '); background-size: cover;">';
          html += '<div class="art-text">';
          html += '<p>' + artText + '</p>' + '</div></div>' + '</a>';
          html += '</div>';

          $('.article-grid').append(html);

        }); //end of .each
      })
      .fail(function (err) {
        alert('Oops, something went wrong. Please try again!');
      })
      .always(function () {
        $('.loading-gif').remove();

      }); //end of .ajax

  }); //end of #sections change event

}); //end of doc ready