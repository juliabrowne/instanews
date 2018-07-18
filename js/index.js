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
            console.log(data.results);

            $.each(data.results, function (key, value) {
              console.log(value.abstract);

              var html = '<div class="new-cell">';
              html += '<a target="_blank" href=' + value.url + '>'
              html += '<img class="news-img" src=' + value.multimedia[4].url + '>';
              html += '<p>' + value.abstract + '</p>' + '</a>';
              html += '</div>';


              $('.article-grid').append(html);
              // var html = class name for grid
              // html += "<p>"  value from before "</p>"
              // html += past value
              // $('.article-grid').append('<p>' + value.abstract + '</p>');

            })
          })
        })



        // var resultsArray = data.results;

        //try using $.each to look through the data (ex: resultsArray) and check out the array in data called //results and try appending the output to your html

        .fail(function (err) {
            throw err;
          })


          .always(function (err) {
            //try removing or detaching the loading gif


          }); // #sections change event


      }); //end doc ready