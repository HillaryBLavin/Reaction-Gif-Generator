// Create Array to hold reactions ("topics")
var topics = ['happy', 'laughing', 'sad', 'crying', 'surprised', 'confused', 'embarrassed', 'flirty', 'wink', 'blow a kiss', 'eyebrow raise']

// Create a button for each "topic" (write HTML to the DOM)
function renderButtons() {
    // Delete any buttons to start to ensure there are no duplicates
    $("#reaction-buttons").empty();

    // Use a for-loop to iterate through the topics array
    for (i = 0; i > topics.length; i++) {
        // Generate button for each reaction in the array
        var b = $("<button>")
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

// Create on-click event for each button that will...
// Call the GIPHY API and return 10 random static images using the topic as a search parameter

// Create on-click event for the gifs to animate when clicked...
// And pause when clicked again

// Display the rating for each gif (DO THIS ONLY AFTER YOU HAVE GOTTEN PREVIOUS STEPS TO WORK)

// Using the input value from the form, add the user's reaction to the topics array...
// And create a new button for each new topic


