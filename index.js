const express = require('express');
const app = express();

app.use('/', express.static('frontend'));

app.post('/save-tweet', function(req, res) {
  /**
   * Here we will save tweet and some analysis should be done to the variable "req" to extract posted data
   */
});

app.get('/get-new-tweet', function(req, res) {
  /**
   * Here I will call your function that you will write and pass "req" to it and I should get a new tweet
   * 
   * maybe like so
   * 
   * 
   * your function is selectNextTweetCarefully
   */

  let newTweetToShowItToUser = selectNextTweetCarefully(req);

});


function selectNextTweetCarefully(req) {

}

app.listen(4000);
console.log('APP IS LISTENING: http://localhost:4000');