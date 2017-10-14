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
    updateMainStatus(json);
    addContext(json);
  })
  .catch(function(err) {
    // TODO:: show sad face with message to refresh or check internet connection
  });

  /**
   * STYLES FOR BAR
      position: absolute;
      width: 4px;
      height: calc(100% - 77px - 20px + 10px + 10px + 1px);
      background-color: rgba(34, 32, 250, .2);
      top: calc(77px + 10px);
      right: calc((77px / 2) + 20px - 2px);
   */

/**
 * "YES", "I DON'T KNOW", and "NO" Buttons Handlers. each of the buttons get a new tweet when they are clicked
 */
document.getElementById('yes').addEventListener('click', function(e) {

  saveChoice(localStorage.getItem('userId'), localStorage.getItem('tweetId'), 1)
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      console.log(json);

      // removeContext();
      updateMainStatus();
      // addContext();
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
        updateStatus();
        // TODO:: updateStatusId();
  
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
        updateStatus();
        // TODO:: updateStatusId();
  
        // remove blurryness
        unBlurTweet();
  
        // TODO:: increase number of tweets
  
        blurDurationSlow();
    });
    
});