// Create Array to hold reactions ("topics")
var topics = ['Laughing', 'Crying', 'Excited', 'Surprised', 'Confused', 'Embarrassed', 'Flirty', 'Winking', 'Blow a Kiss', 'Eyebrow Raise'];

// Create a button for each "topic" (write HTML to the DOM)
function renderButtons() {
    // Delete any buttons to start to ensure there are no duplicates
    $("#reaction-buttons").empty();

    // Use a for-loop to iterate through the topics array
    for (i = 0; i < topics.length; i++) {
        // Generate button for each reaction in the array
        var b = $("<button>");
        // Add bootstrap and rxn-btn classes to the button
        b.addClass("rxn-btn btn btn-primary");
        // Add a data attribute (data-emotion) to the button that will have a reaction as a value
        b.attr("data-emotion", topics[i]);
        // Add text to the button
        b.text(topics[i]);
        // Add the button to the reaction-buttons div
        $("#reaction-buttons").append(b);
    }
}

// Write a function to call the GIPHY API and write the gifs to the DOM
function generateGifs() {
    // Delete any gifs that are already in the reaction-gifs div
    $("#reaction-gifs").empty();
    // Write a variable that grabs the value of the data-emotion
    var emotion = $(this).attr("data-emotion");
    // Write a variable that concatenates the emotion into the API query URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=fKFFjos0nnSXhvx7xXH3PhQehPKzfTHN&q=" + emotion + "&limit=10";

    // AJAX call for the specific reaction button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // Create a variable to store results data
        var results = response.data;
        // Use a for-loop to iterate through the results
        for (var i = 0; i < results.length; i++) {
            // Store each gif's rating
            var rating = results[i].rating;
            // Create variables to store image properties
            var stillURL = results[i].images.original_still.url;
            var animateURL = results[i].images.original.url;
            // Create a div with the bootstrap classes for an Image Card
            var card = $("<div>").addClass("card mx-auto d-block").attr("style", "width: 250px");
            // Create an HTML element to hold the still gif
            var imageTag = $("<img>");
            // Assign a "src" to the image tag using the stored image property
            imageTag.attr("src", stillURL);
            imageTag.attr("data-still", stillURL);
            imageTag.attr("data-animate", animateURL);
            imageTag.attr("data-state", "still");
            imageTag.addClass("gif card-img-top");
            // Create a card-body div
            var cardBody = $("<div>").addClass("card-body");
            // Create a paragraph tag to display the gif's rating
            var p = $("<p>").addClass("card-text").text("Rating: " + rating);
            // Create a variable to grab onto the reaction-gifs div 
            var rxnDiv = $("#reaction-gifs");
            // Append card-text to card-body
            cardBody.append(p);
            // Append imageTag and card-body to card <div>
            card.append(imageTag);
            card.append(cardBody);
            // Append the card to the rxnDiv
            rxnDiv.append(card);
        }

    });

}

// Create on-click event for adding new reaction buttons based on user form input
$("#add-reaction").on("click", function(event) {
    // Add prevent default because we're not sending the info to a database or anything
    event.preventDefault();
    // Grab the user's input from the form 
    var newRxn = $("#reaction-input").val().trim();
    // Add the user's input to the topics array
    topics.push(newRxn);
    // Call renderButtons function
    renderButtons();
});

// Create on-click event that calls the Giphy API when any of the reaction buttons are clicked
$(document).on("click", ".rxn-btn", generateGifs);

// Call the renderButtons function to display initial buttons
renderButtons();

// Create on-click event for the gifs to animate when clicked...
$(document).on("click", ".gif", function() {
    // Create a variable to store the current "state" (animated or still) of the clicked gif
    var state = $(this).attr("data-state");
    // If the gif is currently still...
    if (state === "still") {
        //...then update the src of the <img> to be the animated version of the gif
        $(this).attr("src", $(this).attr("data-animate"));
        //...and update the data-state of the <img> to be "animate"
        $(this).attr("data-state", "animate");
    // If the gif is currently animated...    
    } else {
        //...then update the src of the <img> to be the still version of the gif
        $(this).attr("src", $(this).attr("data-still"));
        //... and update the data-state of the <img> to be "still"
        $(this).attr("data-state", "still");
    }
});




