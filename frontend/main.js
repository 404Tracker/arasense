/**
 * all functions used in here are defined globally in "functions.js"
 */
// Initialize userId ONLY if it was not initialized yet
localStorage.getItem('userId') || localStorage.setItem('userId', makeId());

// fetch first tweet to show
fetch('/initial-tweet', {
  method: 'POST',
  body: JSON.stringify({
    'userId': localStorage.getItem('userId'),
  }),
  headers: new Headers({
    'Content-Type': 'application/json'
  })
})
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    updateUI(json);
  })
  .catch(function(err) {
    // TODO:: show sad face with message to refresh or check internet connection
  });

/**
 * "YES", "I DON'T KNOW", and "NO" Buttons Handlers. each of the buttons get a new tweet when they are clicked
 */
document.getElementById('yes').addEventListener('click', function(e) {

  saveChoice(localStorage.getItem('userId'), localStorage.getItem('tweetId'), 1)
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      updateUI(json);
    });
    
  });
document.getElementById('dontKnow').addEventListener('click', function(e) {
  saveChoice(localStorage.getItem('userId'), localStorage.getItem('tweetId'), 0)
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      updateUI(json);
    });
  });
document.getElementById('no').addEventListener('click', function(e) {
  saveChoice(localStorage.getItem('userId'), localStorage.getItem('tweetId'), -1)
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      updateUI(json);
    });
});