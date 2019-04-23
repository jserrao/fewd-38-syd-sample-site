// Remember, what's the first step with APIs? GO READ THE DOCS! What type of call is this?
// Second step - test an API call in Postman
// Third step - layout what you're going to do with the data
// Fourth step - then you start coding this handler
// Have you done the first three steps?

/**
 * ##############################
 * ES5 - API Calls (works in Internet Explorer)
 * Getting some films from student learning API Studio Ghibli
 * https://ghibliapi.herokuapp.com/# 
 */

// We're wrapping this whole thing in a function
// You don't have to do this but it's best practice
function ghibliMoviesAPIFun() {

  // We're setting up our destination for all the data we're about to get
  var app = document.getElementById('data-drop');

  // This is kinda the old fashioned way to do API but you can set up an new XMLHttpRequest()
  // Basic idea is that you leverage methods that will modify the request object you set up
  var request = new XMLHttpRequest();

  // .open() sets up the kind of request
  // Our case, this is a basic GET request - check out https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open
  // .onload is handler that accepts an anonymous function and will process the response
  request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
  request.onload = function() {

    // Begin accessing JSON data here
    // You'll almost always be parsing a JSON response, as that's what most APIs send back
    var data = JSON.parse(this.response);

    // Here' we're sniffing out the response code and making sure it's in the successful range before processing
    // Error handling is a big part of using APIs responsibily
    if (request.status >= 200 && request.status < 400) {

      // Handling JSON responses requires looking at the shap of the data we're getting back
      // Most API responses are arrays of objects, but not all
      // This is where that Postman tool we looked at comes in - check our your APIs response before you send it in JS!
      
      // There are a ton of array / object methods you can explore
      // For arrays: .forEach, .sort(), .filter(), .map() - plenty more!
      // For objects: Object.keys(), Object.values(), Object.entries, Object.assign, for loop, for of loop, for in loop,
      // Chained methods worth checking out: .every(), .some(), .includes(), .find()
      
      // Up in our parsing step, we've taken the response and assigned it to a variable
      // Now, we're going to loop through that information with .forEach
      // .forEach is loop you can attach to an array that loops through each array index
      // Each array index has an object in it, so all the movie.whatever syntax you see here is referencing object key/value pairs
      data.forEach(function(movie) {
        var card = document.createElement('div');
        card.setAttribute('class', 'card');

        var h1 = document.createElement('h1');
        h1.textContent = movie.title;

        var p = document.createElement('p');
        movie.description = movie.description.substring(0, 300);
        p.textContent = `${movie.description}...`;

        app.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
      })
    } 
    else {
      var errorMessage = document.createElement('marquee')
      errorMessage.textContent = `Gah, it's not working!`
      app.appendChild(errorMessage)
    }
  }

  // Once you setup what should happen in .onLoad, you still need to make the transaction happen
  // Don't forget to fire off .send()
  // In this case, we're waiting to fire off the API request until the big green button gets clicked
  document.getElementById('calling-movies').addEventListener('click', function() {
    request.send();
  })
}
ghibliMoviesAPIFun();




