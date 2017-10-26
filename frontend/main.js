/**
 * all functions used in here are defined globally in "functions.js"
 */
// Initialize userId ONLY if it was not initialized yet
localStorage.getItem('userId') || localStorage.setItem('userId', makeId());
localStorage.getItem('tweets_count') || getTweetsCount(localStorage.getItem('userId'));
localStorage.getItem('tweets_count') && updateCounterUI(localStorage.getItem('tweets_count'));

// after sending a request the user must wait for this period in milliseconds
var REQUEST_THRESHOLD = 1000;

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
    window.location = "";
  });

/**
 * "YES", "I DON'T KNOW", and "NO" Buttons Handlers. each of the buttons get a new tweet when they are clicked
 */
document.getElementById('yes').addEventListener('click', function(e) {

  if (this.getAttribute('aria-disabled') == 'true' || window.requestPrevented) {
    console.log('prevented:', this.getAttribute('aria-disabled'), window.requestPrevented);
    return;
  }

  // blurrr the ui & disable buttons
  document.getElementById('status-view').classList.add('blur-4');
  disableChoices();
  if (localStorage.getItem('tweets_count')) {
    updateCounterStorage(
      parseInt(localStorage.getItem('tweets_count')) + 1
    );
    updateCounterUI(localStorage.getItem('tweets_count'));
  } else {
    // retry to get tweets from server
    getTweetsCount(localStorage.getItem('userId'));
  }
  if (localStorage.getItem('tweets_count')) {
    tryToCelebrate(
      parseInt(localStorage.getItem('tweets_count'))
    );
  }

  window.requestPrevented = true;
  setTimeout(function() {
    window.requestPrevented = false;
  }, window.REQUEST_THRESHOLD);
  
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
    window.location = "";
  });

});

document.getElementById('dontKnow').addEventListener('click', function(e) {
  if (this.getAttribute('aria-disabled') == 'true' || window.requestPrevented) {
    console.log('prevented:', this.getAttribute('aria-disabled'), window.requestPrevented);
    return;
  }

  // blurrr the ui & disable buttons
  document.getElementById('status-view').classList.add('blur-4');
  disableChoices();
  if (localStorage.getItem('tweets_count')) {
    updateCounterStorage(
      parseInt(localStorage.getItem('tweets_count')) + 1
    );
    updateCounterUI(localStorage.getItem('tweets_count'));
  } else {
    // retry to get tweets from server
    getTweetsCount(localStorage.getItem('userId'));
  }
  if (localStorage.getItem('tweets_count')) {
    tryToCelebrate(
      parseInt(localStorage.getItem('tweets_count'))
    );
  }

  window.requestPrevented = true;
  setTimeout(function() {
    window.requestPrevented = false;
  }, window.REQUEST_THRESHOLD);

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
    window.location = "";
  });
  
});

document.getElementById('no').addEventListener('click', function(e) {
  if (this.getAttribute('aria-disabled') == 'true' || window.requestPrevented) {
    console.log('prevented:', this.getAttribute('aria-disabled'), window.requestPrevented);
    return;
  }

  // blurrr the ui & disable buttons
  document.getElementById('status-view').classList.add('blur-4');
  disableChoices();
  if (localStorage.getItem('tweets_count')) {
    updateCounterStorage(
      parseInt(localStorage.getItem('tweets_count')) + 1
    );
    updateCounterUI(localStorage.getItem('tweets_count'));
  } else {
    // retry to get tweets from server
    getTweetsCount(localStorage.getItem('userId'));
  }
  if (localStorage.getItem('tweets_count')) {
    tryToCelebrate(
      parseInt(localStorage.getItem('tweets_count'))
    );
  }

  window.requestPrevented = true;
  setTimeout(function() {
    window.requestPrevented = false;
  }, window.REQUEST_THRESHOLD)
  
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
    window.location = "";
  });

});