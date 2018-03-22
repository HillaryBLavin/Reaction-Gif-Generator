// Create Array to hold reactions ("topics")
var topics = ['Happy', 'Laughing', 'Sad', 'Crying', 'Surprised', 'Confused', 'Embarrassed', 'Flirty', 'Wink', 'Blow a Kiss', 'Eyebrow Raise'];

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
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=fKFFjos0nnSXhvx7xXH3PhQehPKzfTHN&limit=10";

    // AJAX call for the specific reaction button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // Create a variable to grab onto the reaction-gifs div 
        var rxnDiv = $("#reaction-gifs");
        // Append the retrieved gifs to the div
        rxnDiv.append(response);
        // Create a variable to store the image paramater
        var gifURL = response.original_still;
        //Create an HTML element to hold the still gif
        var stillGif = $("<img>").attr("src", gifURL);
        // Append the gif to the div
        rxnDiv.append(stillGif);
    });

}

// Create on-click event for adding new reaction buttons
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
// And pause when clicked again

// Display the rating for each gif (DO THIS ONLY AFTER YOU HAVE GOTTEN PREVIOUS STEPS TO WORK)

// Using the input value from the form, add the user's reaction to the topics array...
// And create a new button for each new topic


