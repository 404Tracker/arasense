/**
 * all functions used in here are defined globally in "functions.js"
 */
// Initialize userId ONLY if it was not initialized yet
localStorage.getItem('userId') || localStorage.setItem('userId', makeId());

// fetch first two tweet
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
  .then(function(tweets) {
    window.tweets = tweets;
    console.log('got initial two tweets, length now is', window.tweets.length);

    window.currentTweet = window.tweets.pop();
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
  debugger;
  if (this.getAttribute('aria-disabled') == 'true') {
    return;
  }
  
  saveChoice(localStorage.getItem('userId'), window.currentTweet.id, 1)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
    
    throw new Error('response is weird');
  })
  .then(function(tweets) {
    tweets.map(function(tweet) {
      window.tweets.push(tweet);
    });
    console.log('got another two tweets, length now is', window.tweets.length);
  })
  .catch(function(error) {
    console.log(error);
    // TODO:: show sad face with message to refresh or check internet connection
  });
  
  disableChoices();
  window.currentTweet = window.tweets.pop();
  updateUI(window.currentTweet);

});

document.getElementById('dontKnow').addEventListener('click', function(e) {
  if (this.getAttribute('aria-disabled') == 'true') {
    return;
  }
  
  saveChoice(localStorage.getItem('userId'), window.currentTweet.id, 0)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
    
    throw new Error('response is weird');
  })
  .then(function(tweets) {
    tweets.map(function(tweet) {
      window.tweets.push(tweet);
    })
    console.log('got another two tweets, length now is', window.tweets.length);
  })
  .catch(function(error) {
    console.log(error);
    // TODO:: show sad face with message to refresh or check internet connection
  });
  
  disableChoices();
  window.currentTweet = window.tweets.pop();
  updateUI(window.currentTweet);

});

document.getElementById('no').addEventListener('click', function(e) {
  if (this.getAttribute('aria-disabled') == 'true') {
    return;
  }

  
  saveChoice(localStorage.getItem('userId'), window.currentTweet.id, -1)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
    
    throw new Error('response is weird');
  })
  .then(function(tweets) {
    tweets.map(function(tweet) {
      window.tweets.push(tweet);
    });
    console.log('got another two tweets, length now is', window.tweets.length);
  })
  .catch(function(error) {
    console.log(error);
    // TODO:: show sad face with message to refresh or check internet connection
  });
  
  disableChoices();
  window.currentTweet = window.tweets.pop();
  updateUI(window.currentTweet);

});