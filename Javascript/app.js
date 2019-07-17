var topics = ["The Office", "Parks and Recreation", "Game of Thrones", "Friends", "Breaking Bad", "Stranger Things"];


// function to create new buttons for each element in the array
function renderButtons() {

    $("#button-view").empty();

    for (var i = 0; i < topics.length; i++){
        // Dynamically creates new button 
        var newBtn = $("<button>");
        // added a class for each button
        newBtn.addClass("TVshow");
        // added a data attribute for each 
        newBtn.attr("data-name", topics[i]);
        // button text
        newBtn.text(topics[i]);
        $("#button-view").append(newBtn);

    }
}

function displayGifs(){
    $("#Gif-view").empty();
    var name = $(this).attr("data-name");
    // var new_name = name.split(" ").join("+");
    //console.log(new_name);
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&limit=10&offset=0&api_key=dc6zaTOxFJmzC";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        for (var i = 0; i < 10; i++){

            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");
            var rating = response.data[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var gif = $("<img>");
            gif.addClass("gifs");
            gif.attr("src", response.data[i].images.fixed_height_still.url);
            gif.attr("data-still", response.data[i].images.fixed_height_still.url);
            gif.attr("data-animate", response.data[i].images.fixed_height.url);
            gif.attr("data-state", "still");

            gifDiv.append(p);
            gifDiv.append(gif);
            $("#Gif-view").append(gifDiv);
        }

        
    });
};

// play/pause gifs
function gifControl(){
    var state = $(this).attr("data-state");
    var dataStill = $(this).attr("data-still");
    var dataAnimate = $(this).attr("data-animate");

    if (state === "still"){
        $(this).attr("src", dataAnimate);
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", dataStill);
        $(this).attr("data-state", "still");
    }
}

//adding new buttons

$("#add-button").on("click", function(event){

    //prevent default behavior of button i.e. submitting the form
    event.preventDefault();

    // clear the container to prevent repetitive buttons
    $("#button-view").empty();

    var newShow = $("#topic-input").val();
    topics.push(newShow);
    renderButtons();
});

$(document).on("click", ".gifs", gifControl);

$(document).on("click", ".TVshow", displayGifs);
renderButtons();
// $(document).on("click", ".movie", function(){});

