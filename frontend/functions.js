function makeId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 50; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
function updateStatus(status) {
  if ( ! status.is_qouted_status && ! status.is_replied_to_status ) {
    if ( ! status.has_video && ! status.has_image) {
      var status = document.getElementById('standard-status').content.cloneNode(true);
      document.getElementById('status-view').appendChild(status);
      return;
    } 
    if ( ! status.has_video && status.has_image) {
      var status = document.getElementById('pic-status').content.cloneNode(true);
      document.getElementById('status-view').appendChild(status);
      return;
    }
    if ( status.has_video && ! status.has_image) {
      var status = document.getElementById('vid-status').content.cloneNode(true);
      document.getElementById('status-view').appendChild(status);
      return;
    }
  }

  if ( status.is_qouted_status && ! status.is_replied_to_status )  {
    var status = document.getElementById('qouted-status').content.cloneNode(true);
    document.getElementById('status-view').appendChild(status);
    return;
  }

  if ( ! status.is_qouted_status && status.is_replied_to_status )  {
    var status = document.getElementById('replied-to-status').content.cloneNode(true);
    document.getElementById('status-view').appendChild(status);
    return;
  }
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
function updateStatusId(tweetId) {
  localStorage.setItem('tweetId', tweetId);
}
function updateMainStatus(json) {
  document.getElementById('status-view').classList.add('blur-4');
  addContext();
}