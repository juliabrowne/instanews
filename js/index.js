$(document).ready(function () {

  // $(window).resize(function () {
  // console.log($(window).width()); 
  // }); 
  // add class to header
  // to reduce size of logo

  $('#sections').on('change', function () {

    var loader = '<div class="loading-gif">';
    loader += '<img src="../images/ajax-loader.gif" alt="Loading Gif">';
    loader += '</div>';

    var selectedStory = $('#sections').val();

    $('.article-grid').empty();
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
      .done(function (data) {
        // data.results are filtered to only show articles that have images
        var filterResults = data.results.filter(function (result) {
          return result.multimedia;
        }).slice(0, 12);

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
        alert('Oops, something went wrong. Please try again!');
        console.log(err);
      })
      .always(function () {
        $('.loading-gif').remove();


    




      }); // end of .ajax

    //   $('.art-text').hide();
    //   $('.art-text').hover(function(){
    //     var index = $(this).index();
    //     $(this).children().show(500);
    //   }, function() {
    //     $(this).children().hide(500);
    //   });
    // }).fail(function() {
    //   alert('Something went wrong, please refresh.');

      // $('.new-cell').hover(function () {
      //     $(this).show('.art-text');
      //   }, function () {
      //     $(this).hide('.art-text');
      //   }
      // );


  }); // #sections change event

}); // end of doc ready