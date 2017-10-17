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
    // perpare qouted status
    var qoutedStatus = document.getElementById('standard-status').content.cloneNode(true).querySelector('#status-wrapper');
    qoutedStatus.querySelector('#username').innerText = json.replied_to_status.user.name;
    qoutedStatus.querySelector('#username').classList.remove('f-s-16');
    qoutedStatus.querySelector('#twitter-handle').innerText = `${json.replied_to_status.user.screen_name}@`;
    qoutedStatus.querySelector('#twitter-handle').classList.remove('f-s-11');
    qoutedStatus.querySelector('#status-body p').innerText = json.replied_to_status.text;
    qoutedStatus.querySelector('img').remove();
    qoutedStatus.querySelector('#status-body').classList.remove('m-t-10', 'm-b-0', 'm-r-58');
    qoutedStatus.querySelector('#username').parentElement.classList.remove('m-r-10');
    qoutedStatus.classList.add('m-t-10');
    qoutedStatus.style.border = '.1px solid rgba(0, 0, 0, 0.2)';
    qoutedStatus.style.fontSize = '12px';
  
    // update main status and add the qouted status inside of it
    var mainStatus = document.querySelector('#status-view #status-wrapper'),
        p = document.createElement('p');
  
    p.innerText = json.text;
    mainStatus.querySelector('#username').innerHTML = json.user.name;
    mainStatus.querySelector('#twitter-handle').innerHTML = `${json.user.screen_name}@`;
    mainStatus.querySelector('#status-body').innerHTML = '';
    mainStatus.querySelector('#status-body').appendChild(p);
    mainStatus.querySelector('#status-body').insertAdjacentElement('beforeend', qoutedStatus);
    mainStatus.style.fontSize = 'initial';
  
}
function isQuotedStatus(json) {
  // perpare qouted status
  var qoutedStatus = document.getElementById('standard-status').content.cloneNode(true).querySelector('#status-wrapper');
  qoutedStatus.querySelector('#username').innerText = json.quoted_status.user.name;
  qoutedStatus.querySelector('#username').classList.remove('f-s-16');
  qoutedStatus.querySelector('#twitter-handle').innerText = `${json.quoted_status.user.screen_name}@`;
  qoutedStatus.querySelector('#twitter-handle').classList.remove('f-s-11');
  qoutedStatus.querySelector('#status-body p').innerText = json.quoted_status.text;
  qoutedStatus.querySelector('img').remove();
  qoutedStatus.querySelector('#status-body').classList.remove('m-t-10', 'm-b-0', 'm-r-58');
  qoutedStatus.querySelector('#username').parentElement.classList.remove('m-r-10');
  qoutedStatus.classList.add('m-t-10');
  qoutedStatus.style.border = '.1px solid rgba(0, 0, 0, 0.2)';
  qoutedStatus.style.fontSize = '12px';

  // update main status and add the qouted status inside of it
  var mainStatus = document.querySelector('#status-view #status-wrapper'),
      p = document.createElement('p');

  p.innerText = json.text;
  mainStatus.querySelector('#username').innerHTML = json.user.name;
  mainStatus.querySelector('#twitter-handle').innerHTML = `${json.user.screen_name}@`;
  mainStatus.querySelector('#status-body').innerHTML = '';
  mainStatus.querySelector('#status-body').appendChild(p);
  mainStatus.querySelector('#status-body').insertAdjacentElement('beforeend', qoutedStatus);
  mainStatus.style.fontSize = 'initial';

}
function isStandardStatus(json) {
  var mainStatus = document.querySelector('#status-view #status-wrapper'),
      p = document.createElement('p');

  removeContextUI();

  p.innerText = json.text;
  mainStatus.querySelector('#username').innerHTML = json.user.name;
  mainStatus.querySelector('#username').classList.add('f-s-16');
  mainStatus.querySelector('#twitter-handle').innerHTML = `${json.user.screen_name}@`;
  mainStatus.querySelector('#twitter-handle').classList.add('f-s-11');
  mainStatus.querySelector('#status-body').innerHTML = p.innerHTML;
  mainStatus.style.fontSize = 'initial';
}
function updateView(json) {
  window.removeContextUI();
  // swap old ui with new ui
  if (json.replied_to_status) {
    window.isReplyToStatus(json);
  } else if (json.is_quote_status) {
    window.isQuotedStatus(json);
  } else {
    window.isStandardStatus(json);
  }
}
function updateUI(json) {
  // blurrrr the ui
  var view = document.getElementById('status-view');
  var handler = function(evt) {
    updateView(json);
    // UNblurrrr the ui
    document.getElementById('status-view').classList.remove('blur-4');
    setTimeout(enableChoices, 100);
    evt.target.removeEventListener('transitionend', handler);
  };
  
  view.addEventListener('transitionend', handler);
  view.classList.add('blur-4');
}
function shadowHandlers() {
  document.getElementById('yes').addEventListener('touchstart', function(e) {
    this.style.boxShadow = 'initial';
  });
  document.getElementById('yes').addEventListener('touchend', function(e) {
    this.style.boxShadow = '0px 1.8px 2px rgb(132, 132, 132)';
  });

  document.getElementById('dontKnow').addEventListener('touchstart', function(e) {
    this.style.boxShadow = 'initial';
  });
  document.getElementById('dontKnow').addEventListener('touchend', function(e) {
    this.style.boxShadow = '0px 1.8px 2px rgb(132, 132, 132)';
  });

  document.getElementById('no').addEventListener('touchstart', function(e) {
    this.style.boxShadow = 'initial';
  });
  document.getElementById('no').addEventListener('touchend', function(e) {
    this.style.boxShadow = '0px 1.8px 2px rgb(132, 132, 132)';
  });
}
function disableChoices() {
  document.getElementById('yes').classList.remove('choice-shadow');
  document.getElementById('dontKnow').classList.remove('choice-shadow');
  document.getElementById('no').classList.remove('choice-shadow');

  document.getElementById('yes').setAttribute('aria-disabled', 'true');
  document.getElementById('dontKnow').setAttribute('aria-disabled', 'true');
  document.getElementById('no').setAttribute('aria-disabled', 'true');
}
function enableChoices() {
  document.getElementById('yes').classList.add('choice-shadow');
  document.getElementById('dontKnow').classList.add('choice-shadow');
  document.getElementById('no').classList.add('choice-shadow');
  
  document.getElementById('yes').setAttribute('aria-disabled', 'false');
  document.getElementById('dontKnow').setAttribute('aria-disabled', 'false');
  document.getElementById('no').setAttribute('aria-disabled', 'false');
}