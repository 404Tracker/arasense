function makeId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 50; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
function blurDurationSlow() {
  setTimeout(function() {
    document.getElementById('avatar').style.transitionDuration = '4s';
    document.getElementById('username').style.transitionDuration = '4s';
    document.getElementById('twitter-handle').style.transitionDuration = '4s';
    document.getElementById('tweet-body').style.transitionDuration = '4s';
  }, 0);
}
function blurDurationFast() {
  document.getElementById('avatar').style.transitionDuration = '.1s';
  document.getElementById('username').style.transitionDuration = '.1s';
  document.getElementById('twitter-handle').style.transitionDuration = '.1s';
  document.getElementById('tweet-body').style.transitionDuration = '.1s';
}
function blurTweet() {
  document.getElementById('avatar').classList.add('blur-6');
  document.getElementById('username').classList.add('blur-6');
  document.getElementById('twitter-handle').classList.add('blur-6');
  document.getElementById('tweet-body').classList.add('blur-6');
}
function unBlurTweet() {
  document.getElementById('avatar').classList.remove('blur-6');
  document.getElementById('username').classList.remove('blur-6');
  document.getElementById('twitter-handle').classList.remove('blur-6');
  document.getElementById('tweet-body').classList.remove('blur-6');
}
function updateTweet(img, name, username, body) {
  document.getElementById('avatar').src = img;
  document.getElementById('username').innerText = name;
  document.getElementById('twitter-handle').innerText = username;
  document.getElementById('tweet-body').innerText = body;
}
function saveChoice(userId, tweetId, choice) {
  return fetch('/save-choice', {
    method: 'POST',
    body: JSON.stringify({
      'userId': userId,
      'tweetId': tweetId,
      'choice': choice
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  });
}
function updateTweetId(tweetId) {
  localStorage.setItem('tweetId', tweetId);
}


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
    return response.text();
  })
  .then(function(json) {
    console.log(json);
    
    // TODO:: updateTweetId();
  });

/**
 * YES, I DON'T KNOW, and NO Buttons Handlers. each of the buttons get a new tweet when they are clicked
 */
document.getElementById('yes').addEventListener('click', function(e) {
  blurTweet();

  saveChoice(localStorage.getItem('userId'), localStorage.getItem('tweetId'), 1)
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      console.log(json);
      blurDurationFast();
  
        // change values
        updateTweet();
        // TODO:: updateTweetId();
  
        // remove blurryness
        unBlurTweet();

  
        // TODO:: increase number of tweets
  
        blurDurationSlow();
    });
    
  });
document.getElementById('dontKnow').addEventListener('click', function(e) {
  blurTweet();

  saveChoice(localStorage.getItem('userId'), localStorage.getItem('tweetId'), 0)
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      console.log(json);
      blurDurationFast();
  
        // change values
        updateTweet();
        // TODO:: updateTweetId();
  
        // remove blurryness
        unBlurTweet();
  
        // TODO:: increase number of tweets
  
        blurDurationSlow();
    });
  });
document.getElementById('no').addEventListener('click', function(e) {
  blurTweet();

  saveChoice(localStorage.getItem('userId'), localStorage.getItem('tweetId'), -1)
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      console.log(json);
      blurDurationFast();
  
        // change values
        updateTweet();
        // TODO:: updateTweetId();
  
        // remove blurryness
        unBlurTweet();
  
        // TODO:: increase number of tweets
  
        blurDurationSlow();
    });
    
});