function makeId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 50; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
function sleep(ms) {
  var start = new Date().getTime(), expire = start + ms;
  while (new Date().getTime() < expire) { }
  return;
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
function addBackgroundColorToIt(el, color) {
  el.style.backgroundColor = color;
}
function updateStatusId(tweetId) {
  localStorage.setItem('tweetId', tweetId);
}
function removeContextUI() {
  var bar = document.querySelector('#status-wrapper #bar'),
      mainStatus = document.querySelector('#status-wrapper'),
      quotedStatus = document.querySelector('#status-body #status-wrapper'),
      bottomStatus = document.querySelector('#status-view .bottomStatus'),
      theSeparator = document.querySelector('#the-separator');
  if (bar) {
    bar.remove();
  }
  if (bottomStatus) {
    bottomStatus.remove();
  }
  if (quotedStatus) {
    quotedStatus.remove();
  }
  if (theSeparator) {
    theSeparator.remove();
  }

  addBackgroundColorToIt(mainStatus, '#fff');
}
function isReplyToStatus(json) {
  // update status
  var topStatus = document.querySelector('#status-view > #status-wrapper'),
      p = document.createElement('p');

  p.innerText = json.replied_to_status.text;
  topStatus.querySelector('h5').innerHTML = json.replied_to_status.user.name;
  topStatus.querySelector('h6').innerHTML = `${json.replied_to_status.user.screen_name}@`;
  topStatus.querySelector('#status-body').innerHTML = p.innerHTML;

  // create a horizontal gray line and add it to separate betweet the old status and the new status
  var separator = document.createElement('span');
  separator.id = 'the-separator';
  separator.classList.add('bg-lightgray', 'd-block', 'w-100vw', 'h-1');
  document.querySelector('#status-view').appendChild(separator);

  // create a thin vertical bar and place it between the two avatars.
  var bar = document.createElement('div');
  bar.id = 'bar';
  bar.style.position = 'absolute';
  bar.style.width = '2px';
  bar.style.height = 'calc((((100% - 10px) - 48px) + 10px) + 1px)';
  bar.style.top = 'calc(10px + 48px)';
  bar.style.right = 'calc(20px + 22.5px)';
  bar.classList.add('bg-lightgray');
  document.querySelector('#status-wrapper').appendChild(bar);

  // create and inject bottom status
  var bottomStatus = document.getElementById('standard-status').content.cloneNode(true),
      repliedTo = document.createElement('span');
  repliedTo.style.color = 'rgba(0, 0, 0, 0.41)';
  repliedTo.style.marginTop = '-20px';
  repliedTo.style.display = 'block';
  repliedTo.innerText = `ردَّا على ${json.replied_to_status.user.screen_name}@`;
  bottomStatus.querySelector('h5').innerText = json.user.name;
  bottomStatus.querySelector('h6').innerText = `${json.user.screen_name}@`;
  bottomStatus.querySelector('p').innerText = json.text.replace(`@${json.replied_to_status.user.screen_name}`, '');
  bottomStatus.querySelector('#status-body').insertAdjacentElement('afterbegin', repliedTo);

  addBackgroundColorToIt(bottomStatus.querySelector('#status-wrapper'), 'rgba(255, 255, 0, 0.35)');
  document.querySelector('#status-view').appendChild(bottomStatus);
}
function isQuotedStatus(json) {
  // perpare qouted status
  var qoutedStatus = document.getElementById('standard-status').content.cloneNode(true).querySelector('#status-wrapper');
  qoutedStatus.querySelector('#username').innerText = json.quoted_status.user.name;
  qoutedStatus.querySelector('#twitter-handle').innerText = `${json.quoted_status.user.screen_name}@`;
  qoutedStatus.querySelector('#status-body p').innerText = json.quoted_status.text;
  qoutedStatus.querySelector('img').remove();
  qoutedStatus.querySelector('#status-body').classList.remove('m-t-10', 'm-b-0', 'm-r-58');
  qoutedStatus.querySelector('#username').parentElement.classList.remove('m-r-10');
  qoutedStatus.classList.add('m-t-10');
  qoutedStatus.style.border = '.1px solid rgba(0, 0, 0, 0.2)';
  addBackgroundColorToIt(qoutedStatus, '#fff');

  // update main status and color it yellow and add the qouted status inside of it
  var mainStatus = document.querySelector('#status-view #status-wrapper'),
      p = document.createElement('p');

  p.innerText = json.text;
  mainStatus.querySelector('#username').innerHTML = json.user.name;
  mainStatus.querySelector('#twitter-handle').innerHTML = `${json.user.screen_name}@`;
  mainStatus.querySelector('#status-body').innerHTML = '';
  mainStatus.querySelector('#status-body').appendChild(p);
  mainStatus.querySelector('#status-body').insertAdjacentElement('beforeend', qoutedStatus);
  addBackgroundColorToIt(mainStatus, 'rgba(255, 255, 0, 0.35)');

}
function isStandardStatus(json) {
  var mainStatus = document.querySelector('#status-view #status-wrapper'),
      p = document.createElement('p');

  removeContextUI();

  p.innerText = json.text;
  mainStatus.querySelector('#username').innerHTML = json.user.name;
  mainStatus.querySelector('#twitter-handle').innerHTML = `${json.user.screen_name}@`;
  mainStatus.querySelector('#status-body').innerHTML = p.innerHTML;

  addBackgroundColorToIt(mainStatus, 'rgba(255, 255, 0, 0.35)');
}
function updateUI(json) {
  // blurrrr the ui
  document.getElementById('status-view').classList.add('blur-4');
  
  removeContextUI();
  // swap old ui with new ui
  if (json.replied_to_status) {
    isReplyToStatus(json);
  } else if (json.is_quote_status) {
    isQuotedStatus(json);
  } else {
    isStandardStatus(json);
  }

  // UNblurrrr the ui
  document.getElementById('status-view').classList.remove('blur-4');
}