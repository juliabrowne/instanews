$(document).ready(function () {

  $('#sections').on('change', function () {

    //try appending loading gif

    // add class to header
    // to reduce size of logo

    var selectedStory = $('#sections').val();

    $('.article-grid').empty();


    //url for our API request
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
      .done(function (data) {

        /**
         * Filter data.results to only return articles if they have images
         */
        var filterResults = data.results.filter(function (result) {
          return result.multimedia;
        }).slice(0, 12);

        console.log(filterResults);

        $.each(filterResults, function (key, value) {
          var artLink = value.url;
          var artImg = value.multimedia[4].url;
          var artText = value.abstract;
          var html = '<div class="new-cell">';

          html += '<a href=' + artLink + '>';
          html += '<div class="bg-img" style="background-image: url(' + artImg + '); background-size: cover;">';
          html += '<div class="art-text">';
          html += '<p>' + artText + '</p>' + '</div>' + '</a>';
          html += '</div>';

          $('.article-grid').append(html);

        }); // end of .each
      })
      .fail(function (err) {
        alert("an error has occured, please try again");
        console.log(err);
      })
      .always(function () {
        //try removing or detaching the loading gif
      }); // end of .ajax


  }); // #sections change event


}); // end of doc ready