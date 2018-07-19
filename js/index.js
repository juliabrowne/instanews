$(document).ready(function () {



  $('#sections').on('change', function () {

      //try appending loading gif

      var selectedStory = $('#sections').val();
      console.log(selectedStory);


      $(".article-grid").empty();



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
          var filterResults = data.results.filter(function(result) {
            return results.multimedia;
          }).slice(0, 12);



          $.each(data.results, function (key, value) {


            // var html = '<div class="new-cell">';
            // html += '<a target="_blank" href=' + value.url + '>'
            // html += '<img class="news-img" src=' + value.multimedia[4].url + '>';
            // html += '<p>' + value.abstract + '</p>' + '</a>';
            // html += '</div>';



            // var html = '<div class="new-cell">';
            // var bgImg = $('.bg-img').css('background-image' + value.multimedia[4].url);

            var artLink = value.url;
            var artImg = value.multimedia[4].url;
            var artText = value.abstract;
            var html = '<div class="new-cell">';

            html += '<a href=' + artLink + '>';
            html += '<div class="bg-img" style="background-image: url(' + artImg + ')">';
            html += '<div class="art-text">';
            html += '<p>' + artText + '</p>' + '</div>' + '</a>';
            html += '</div>';


          })
        })
    })



    //var resultsArray = data.results;

    // try using $.each to look through the data (ex: resultsArray) and check out the    // array in data called 
    //results and try appending the output to your html



    .fail(function (err) {
      throw err;
    })


    .always(function (err) {
      //try removing or detaching the loading gif


    }); // #sections change event


}); 
