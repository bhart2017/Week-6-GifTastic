var topicsArray = ["egret","falcon","eagle","hummingbird","heron","owl","vulture","swan","gull","cockatoo","ostrich","flamingo","parrot","hawk"]
var deleteEnabled = false;
$(document).ready(function() {
  addButton();
  $('#addBird').on('click', function(event){
    event.preventDefault();
    var newBird = $('#birdInput').val().trim();
     $('#birdInput').val("")
    topicsArray.push(newBird);
    addButton();
  });

  $('#birdButton').on('click', '.bird', function(){
    var theButtonText = this.textContent;
    if (deleteEnabled === true) {
      topicsArray.splice(topicsArray.indexOf(theButtonText),1);
      $(this).remove();
      deleteEnabled = false;
    }
    else{
      var searchText = theButtonText.replace(" ", "+");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q="+searchText+"&limit=10&api_key=dc6zaTOxFJmzC";
      $.ajax({url: queryURL, method: 'GET'}).done(function(ajaxResponse) {
        addGifs(ajaxResponse);
      });
    }
  })

  $("#giphypic").on('click', '.giphy', function(){
    if (deleteEnabled === true) {
      $(this).parent().remove();
      deleteEnabled = false;
    }
    else{
    animateGifs(this);
    }
  })

  function addButton(){
    $('.bird').remove();
    for (var i = 0; i < topicsArray.length; i++) {
      var $button = $('<button>') 
      $button.addClass('bird btn'); 
      $button.attr('data-name', topicsArray[i]); 
      $button.html(topicsArray[i]); 
      $('#birdButton').append($button);
    };
  }; 
  function addGifs(ajaxResponse){
    for (var objNdx = 0; objNdx < ajaxResponse.data.length; objNdx++) {
      var gifUrlAnime = ajaxResponse.data[objNdx].images.fixed_height.url;
      var gifUrlStill = ajaxResponse.data[objNdx].images.fixed_height_still.url;
      var gifHeight = ajaxResponse.data[objNdx].images.fixed_height.height;
      var gifRating = ajaxResponse.data[objNdx].rating;
      var $div=$('<div>');
      $div.addClass("gifDiv pull-left");
      var $p=$('<p>').text("Rating: "+gifRating);
      $p.addClass("text-center");
      var $gifImage = $('<img>');
      $gifImage.attr('src', gifUrlStill);
      $gifImage.attr('data-still', gifUrlStill);
      $gifImage.attr('data-animate', gifUrlAnime);
      $gifImage.attr('data-state', 'still');
      $gifImage.addClass('giphy');
      $div.append($p);
      $div.append($gifImage);
      $('#giphypic').prepend($div);
    }
  }

  function animateGifs(gifClicked){
    if ( $(gifClicked).attr('data-state') == 'still'){
      $(gifClicked).attr('src', $(gifClicked).data('animate'));
      $(gifClicked).attr('data-state', 'animate');
    }else{
      $(gifClicked).attr('src', $(gifClicked).data('still'));
      $(gifClicked).attr('data-state', 'still');
    }
  }
  
}); 