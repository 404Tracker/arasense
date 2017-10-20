function makeId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 50; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
function saveChoice(userId, tweetId, device, choice) {
  return fetch('/save-choice', {
    method: 'POST',
    body: JSON.stringify({
      'userId': userId,
      'tweetId': tweetId,
      'device': device,
      'choice': choice
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  });
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
    mainStatus.querySelector('#avatar').src = '';
    mainStatus.querySelector('#avatar').src = "https://avatars.io/twitter/" + json.user.screen_name;
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
  qoutedStatus.querySelector('#twitter-handle').innerText = json.quoted_status.user.screen_name + "@";
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
  mainStatus.querySelector('#avatar').src = '';
  mainStatus.querySelector('#avatar').src = "https://avatars.io/twitter/" + json.user.screen_name;
  mainStatus.querySelector('#username').innerHTML = json.user.name;
  mainStatus.querySelector('#twitter-handle').innerHTML = json.user.screen_name + "@";
  mainStatus.querySelector('#status-body').innerHTML = '';
  mainStatus.querySelector('#status-body').appendChild(p);
  mainStatus.querySelector('#status-body').insertAdjacentElement('beforeend', qoutedStatus);
  mainStatus.style.fontSize = 'initial';

}
function isStandardStatus(json) {
  var mainStatus = document.querySelector('#status-view #status-wrapper'),
      p = document.createElement('p');

  p.innerText = json.text;
  mainStatus.querySelector('#avatar').src = '';
  mainStatus.querySelector('#avatar').src = "https://avatars.io/twitter/" + json.user.screen_name;
  mainStatus.querySelector('#username').innerHTML = json.user.name;
  mainStatus.querySelector('#username').classList.add('f-s-16');
  mainStatus.querySelector('#twitter-handle').innerHTML = json.user.screen_name + "@";
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
function disableChoices() {
  document.getElementById('yes').classList.remove('choice-shadow', 'cursor-pointer');
  document.getElementById('dontKnow').classList.remove('choice-shadow', 'cursor-pointer');
  document.getElementById('no').classList.remove('choice-shadow', 'cursor-pointer');

  document.getElementById('yes').setAttribute('aria-disabled', 'true');
  document.getElementById('dontKnow').setAttribute('aria-disabled', 'true');
  document.getElementById('no').setAttribute('aria-disabled', 'true');
}
function enableChoices() {
  document.getElementById('yes').classList.add('choice-shadow', 'cursor-pointer');
  document.getElementById('dontKnow').classList.add('choice-shadow', 'cursor-pointer');
  document.getElementById('no').classList.add('choice-shadow', 'cursor-pointer');
  
  document.getElementById('yes').setAttribute('aria-disabled', 'false');
  document.getElementById('dontKnow').setAttribute('aria-disabled', 'false');
  document.getElementById('no').setAttribute('aria-disabled', 'false');
}
/**
 * Determine operating system.
 * This function returns one of 'iOS', 'Android', 'Desktop', or 'Other' for non ios nor android mobile devices.
 * 
 * from stackoverflow: https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
 *
 * @returns {String}
 */
function getOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        return "Android";
    }
    
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return 'ontouchstart' in window ? 'Other' : 'Desktop';
}

function displayRefreshWebsite() {
  var firstP = document.createElement('p'),
      secondP = document.createElement('p'),
      wrapper = document.createElement('div');
  firstP.innerText = 'الإنترنت لا يعمل بصورة صحيحة على جهازك';
  secondP.innerText = 'لذلك، لم نستطع جلب تغريدة.';

  wrapper.appendChild(firstP);
  wrapper.appendChild(secondP);

  firstP.classList.add('m-0');
  secondP.classList.add('m-0');
  wrapper.classList.add('d-flex', 'f-j-center', 'f-a-center', 'f-dir-column', 'm-t-65', 'm-b-65');
  document.getElementById('status-view').nextElementSibling.insertAdjacentElement('afterend', wrapper);
}
function lightenHeader() {
  document.querySelector('header').style.background = '#ecebde';
}
function darkenAgreeColor() {
  document.querySelector('main > h1 span:nth-child(1)').style.color = '#676660';
}
function darkenDisagreeColor() {
  document.querySelector('main > h1 span:nth-child(2)').style.color = '#676660';
}
function completeFailure() {
  displayRefreshWebsite();
  lightenHeader();
  darkenAgreeColor();
  darkenDisagreeColor();
  disableChoices();
}