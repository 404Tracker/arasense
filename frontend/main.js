/**
 * all functions used in here are defined globally in "functions.js"
 */
// Initialize userId ONLY if it was not initialized yet
localStorage.getItem('userId') || localStorage.setItem('userId', makeId());

// fetch first tweet
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
    if (response.ok) {
      return response.json();
    }

    throw new Error('response is weird');
  })
  .then(function(tweet) {
    window.currentTweet = tweet[0];
    updateView(window.currentTweet);
    enableChoices();
  })
  .catch(function(err) {
    console.log(err);
    // TODO:: show sad face with message to refresh or check internet connection
  });

/**
 * "YES", "I DON'T KNOW", and "NO" Buttons Handlers. each of the buttons get a new tweet when they are clicked
 */
document.getElementById('yes').addEventListener('click', function(e) {
  if (this.getAttribute('aria-disabled') == 'true') {
    return;
  }

  // blurrr the ui & disable buttons
  document.getElementById('status-view').classList.add('blur-4');
  disableChoices();
  
  saveChoice(localStorage.getItem('userId'), window.currentTweet.tweetid, getOperatingSystem(), 1)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
    
    throw new Error('response is weird');
  })
  .then(function(tweet) {
    window.currentTweet = tweet[0];
    updateView(window.currentTweet);
    document.getElementById('status-view').classList.remove('blur-4');
    enableChoices();
  })
  .catch(function(error) {
    console.log(error);
    // TODO:: show sad face with message to refresh or check internet connection
  });

});

document.getElementById('dontKnow').addEventListener('click', function(e) {
  if (this.getAttribute('aria-disabled') == 'true') {
    return;
  }

  // blurrr the ui & disable buttons
  document.getElementById('status-view').classList.add('blur-4');
  disableChoices();

  saveChoice(localStorage.getItem('userId'), window.currentTweet.tweetid, getOperatingSystem(), 0)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
    
    throw new Error('response is weird');
  })
  .then(function(tweet) {
    window.currentTweet = tweet[0];
    updateView(window.currentTweet);
    document.getElementById('status-view').classList.remove('blur-4');
    enableChoices();
  })
  .catch(function(error) {
    console.log(error);
    // TODO:: show sad face with message to refresh or check internet connection
  });
  
});

document.getElementById('no').addEventListener('click', function(e) {
  if (this.getAttribute('aria-disabled') == 'true') {
    return;
  }

  // blurrr the ui & disable buttons
  document.getElementById('status-view').classList.add('blur-4');
  disableChoices();
  
  saveChoice(localStorage.getItem('userId'), window.currentTweet.tweetid, getOperatingSystem(), -1)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
    
    throw new Error('response is weird');
  })
  .then(function(tweet) {
    window.currentTweet = tweet[0];
    updateView(window.currentTweet);
    document.getElementById('status-view').classList.remove('blur-4');
    enableChoices();
  })
  .catch(function(error) {
    console.log(error);
    // TODO:: show sad face with message to refresh or check internet connection
  });

});