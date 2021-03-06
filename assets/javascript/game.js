



  var dbzArray = ["Goku", "Vegeta", "Gohan", "Trunks", "Chi-Chi", "Bulma", "Krillin", "Goten", "Tien", "Piccolo", "Yamcha"
  ];
 // append buttons based on the array above
function makeButton() {
// empty post area
  $('#postArea').empty();
//loop through the array and append buttons
  for (var i = 0;i < dbzArray.length; i++){
    var button = $('<button>');
    button.addClass('dbzButton');
    button.attr('data-dbz', dbzArray[i]);
    button.text(dbzArray[i]);

    $('#postArea').append(button);
  }
}

$("#add-dbz").on("click", function(event) {
    event.preventDefault();

    var dbz = $("#dbz-input").val().trim();

    dbzArray.push(dbz);
    $("#dbz-input").val("");

  makeButton();
});
// call to the api and return a response
function getDbzCharacters() {
  var dbzName = $(this).attr("data-dbz");
  var dbzStr = dbzName.split(" ").join('+');
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=MwMMwYf4WvCq9dltXTlB0EiTBuRqygJV&q="+dbzStr+"&limit=5&offset=0&rating=G&lang=en";
  $.ajax({
    url:queryURL,
    method:'GET',
  })
      .done(function(response){
        // set a variable to the response data
      var dataArray = response.data;
       
      // create and display our gif's
      $('#gifArea').empty();
          for (var i = 0; i < dataArray.length; i++){
            var newDiv = $('<div>');
              newDiv.addClass('dbzGif'); 

            var getRating = $('<p>').html("Rating: " + dataArray[i].rating);
              newDiv.append(getRating);

            var getImg = $('<img>');
              getImg.attr("src", dataArray[i].images.fixed_height_still.url);
              getImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
              getImg.attr("data-animate", dataArray[i].images.fixed_height.url);
              getImg.attr("data-state", "still");
              newDiv.append(getImg);

            $('#gifArea').append(newDiv); 

          } 

      });
}


function animateGifs() {
  // The image state will be either "still" or "animated"
  var state = $(this).find("img").attr("data-state");

  // Make the Gif either animated or still depending on the "data-state" value
  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}
// Render the initial dbz buttons when the HTML has finished loading
$(document).ready(function() {
  makeButton();
});

// An event handler for the dbz buttons to fetch appropriate Gifs
$(document).on("click", ".dbzButton", getDbzCharacters);

// Add an event handler for the dbz Gifs to make the image animate and stop
$(document).on("click", ".dbzGif", animateGifs);
  
 