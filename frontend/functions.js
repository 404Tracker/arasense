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
      placeholderBars = document.querySelectorAll('#bar'),
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
  if (placeholderBars) {
    for (var i = 0; i < placeholderBars.length; i++) {
      placeholderBars[i].remove();
    }
  }
  if (mainStatus) {
    mainStatus.querySelector('#status-body').innerHTML = '';
  }
}
function isReplyToStatus(json) {
    // perpare qouted status
    var qoutedStatus = document.getElementById('standard-status').content.cloneNode(true).querySelector('#status-wrapper');
    qoutedStatus.querySelector('#username').innerText = json.replied_to_status.user.name;
    qoutedStatus.querySelector('#username').classList.remove('f-s-16');
    qoutedStatus.querySelector('#twitter-handle').innerText = json.replied_to_status.user.screen_name + "@";
    qoutedStatus.querySelector('#twitter-handle').classList.remove('f-s-11');
    qoutedStatus.querySelector('#status-body p').innerHTML = mentionify(hashtagify(json.replied_to_status.text, json.replied_to_status.entities.hashtags), json.replied_to_status.entities.user_mentions);
    qoutedStatus.querySelector('img').remove();
    qoutedStatus.querySelector('#status-body').classList.remove('m-t-10', 'm-b-0', 'm-r-58');
    qoutedStatus.querySelector('#username').parentElement.classList.remove('m-r-10');
    qoutedStatus.classList.add('m-t-10');
    qoutedStatus.style.border = '.1px solid rgba(0, 0, 0, 0.2)';
    qoutedStatus.style.fontSize = '12px';
  
    // update main status and add the qouted status inside of it
    var mainStatus = document.querySelector('#status-view #status-wrapper'),
        p = document.createElement('p');
  
    p.innerHTML = mentionify(hashtagify(json.text, json.entities.hashtags), json.entities.user_mentions);
    mainStatus.querySelector('#avatar').setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABPSURBVHgB7c9BDcAgAAAxNv+u+IMkkHEhaR3022ue8bB/PE6gJlATqAnUBGoCNYGaQE2gJlATqAnUBGoCNYGaQE2gJlATqAnUBGoCNYHaBenQA78mpvDRAAAAAElFTkSuQmCC');
    if (json.user.profile_image_url) {
      mainStatus.querySelector('#avatar').setAttribute('src', json.user.profile_image_url);
    } else {
      mainStatus.querySelector('#avatar').setAttribute('src', "https://avatars.io/twitter/" + json.user.screen_name);
    }
    mainStatus.querySelector('#username').innerHTML = json.user.name;
    mainStatus.querySelector('#twitter-handle').innerHTML = json.user.screen_name + "@";
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
  qoutedStatus.querySelector('#status-body p').innerHTML = mentionify(hashtagify(json.quoted_status.text, json.quoted_status.entities.hashtags), json.quoted_status.entities.user_mentions);
  qoutedStatus.querySelector('img').remove();
  qoutedStatus.querySelector('#status-body').classList.remove('m-t-10', 'm-b-0', 'm-r-58');
  qoutedStatus.querySelector('#username').parentElement.classList.remove('m-r-10');
  qoutedStatus.classList.add('m-t-10');
  qoutedStatus.style.border = '.1px solid rgba(0, 0, 0, 0.2)';
  qoutedStatus.style.fontSize = '12px';

  // update main status and add the qouted status inside of it
  var mainStatus = document.querySelector('#status-view #status-wrapper'),
      p = document.createElement('p');

  p.innerHTML = mentionify(hashtagify(json.text, json.entities.hashtags), json.entities.user_mentions)
  mainStatus.querySelector('#avatar').setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABPSURBVHgB7c9BDcAgAAAxNv+u+IMkkHEhaR3022ue8bB/PE6gJlATqAnUBGoCNYGaQE2gJlATqAnUBGoCNYGaQE2gJlATqAnUBGoCNYHaBenQA78mpvDRAAAAAElFTkSuQmCC');
  if (json.user.profile_image_url) {
    mainStatus.querySelector('#avatar').setAttribute('src', json.user.profile_image_url);
  } else {
    mainStatus.querySelector('#avatar').setAttribute('src', "https://avatars.io/twitter/" + json.user.screen_name);
  }
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

  p.innerHTML = mentionify(hashtagify(json.text, json.entities.hashtags), json.entities.user_mentions)
  mainStatus.querySelector('#avatar').setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABPSURBVHgB7c9BDcAgAAAxNv+u+IMkkHEhaR3022ue8bB/PE6gJlATqAnUBGoCNYGaQE2gJlATqAnUBGoCNYGaQE2gJlATqAnUBGoCNYHaBenQA78mpvDRAAAAAElFTkSuQmCC');
  if (json.user.profile_image_url) {
    mainStatus.querySelector('#avatar').setAttribute('src', json.user.profile_image_url);
  } else {
    mainStatus.querySelector('#avatar').setAttribute('src', "https://avatars.io/twitter/" + json.user.screen_name);
  }
  mainStatus.querySelector('#username').innerHTML = json.user.name;
  mainStatus.querySelector('#username').classList.add('f-s-16');
  mainStatus.querySelector('#twitter-handle').innerHTML = json.user.screen_name + "@";
  mainStatus.querySelector('#twitter-handle').classList.add('f-s-11');
  mainStatus.querySelector('#status-body').appendChild(p);
  mainStatus.style.fontSize = 'initial';
  
  if (json.entities.media) {
    for ( var i = 0; i < json.entities.media.length; i++ ) {
      if (json.entities.media[i].type === 'photo') {
        var img = document.createElement('img');

        img.src = json.entities.media[i].media_url;
        img.style.width = '100%';
        mainStatus.querySelector('#status-body').appendChild(img);
        break;
      }
    }
  }
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
function linkify(text, entities) {
  if ( entities.urls.length === 0 ) {
    console.log('if block');
    return text;
  } else {
    console.log('else block');
    return entities.urls.reduce(function(likifiedText, url) {
      var a = document.createElement('a');
      a.href = url.expanded_url;
      a.innerText = url;
      return likifiedText.replace(new RegExp(url), a);
    }, text);
  }
}
function hashtagify(text, hashtags) {
  if ( hashtags.length === 0 ) {
    return text;
  } else {
    var hashtagified = hashtags.reduce(function(hashtagifiedText, hashtag) {
      var span = document.createElement('span');
      span.innerText = hashtag.text;
      span.classList.add('color-blue');
      return hashtagifiedText.replace(new RegExp(hashtag.text), span.outerHTML);
    }, text);

    return hashtagified.replace(new RegExp('#', 'g'), '<span class="color-blue">#</span>');
  }
}
function mentionify(text, mentions) {
  if ( mentions.length === 0 ) {
    return text;
  } else {
    var mentionified = mentions.reduce(function(mentionifiedText, mention) {
      var span = document.createElement('span');
      span.innerText = mention.screen_name;
      span.classList.add('color-blue');
      return mentionifiedText.replace(new RegExp(mention.screen_name), span.outerHTML);
    }, text);

    return mentionified.replace(new RegExp('@', 'g'), '<span class="color-blue">@</span>');
  }
}
function updateCounterStorage(number) {
  localStorage.setItem('tweets_count', number);
}
function updateCounterUI(number) {
  document.getElementById('tweets-counter').innerHTML = number;
}
function getTweetsCount(userId) {
  
  fetch('/tweets-count', {
    method: 'POST',
    body: JSON.stringify({
      'userId': userId,
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
    .then(function(count) {
      updateCounterStorage(count);
      updateCounterUI(localStorage.getItem('tweets_count'))
    })
    .catch(function(err) {
      console.error(err);
    })
}
function pickEmoji() {
  var emojis = ['🎻', '🏆', '⛹️‍', '🏋️', '🎉', '🎊', '🔥'];
  var luckyEmoji = Math.abs(Math.floor(Math.random() * 10) - 3);

  return emojis[luckyEmoji];
}
function celebrate(emoji) {
  
  var emojiHolder = document.createElement('span'),
      wrapper = document.createElement('div'),
      count = document.createElement('span');
      
  emojiHolder.innerHTML = emoji;

  // center this sucker
  wrapper.style.position = 'absolute';
  wrapper.style.left = '50%';
  wrapper.style.top = '50%';
  wrapper.style.transform = 'translate(-50%, -50%)';
  // it is centered now!!

  // display this sucker on top of everything
  wrapper.style.zIndex = 9999;
  
  // things
  wrapper.id = 'emoji-wrapper';
  wrapper.style.fontSize = '180px';
  wrapper.style.textShadow = '0px 0px 5px black';
  wrapper.style.opacity = 0;
  wrapper.classList.add('transition-2');
  setTimeout(function() {
    wrapper.style.opacity = 1;
    var fuckThis = function(evt) {
      this.removeEventListener('transitionend', fuckThis);
      this.style.opacity = 0;
      setTimeout(function() {
        // document.getElementById('emoji-wrapper').remove();
      }, 1000)
    };
    wrapper.addEventListener('transitionend', fuckThis)
  }, 1000)

  count.innerHTML = localStorage.getItem('tweets_count');
  count.style.backgroundColor = '#ffe777';
  count.style.borderRadius = '30%';
  count.style.padding = '0px 35px';
  count.style.boxShadow = '0px 0px 4px gray';

  wrapper.classList.add('d-flex', 'f-dir-column', 'f-j-center', 'f-a-center');
  wrapper.appendChild(emojiHolder);
  wrapper.appendChild(count);

  document.body.insertAdjacentElement('afterbegin', wrapper);
}
function tryToCelebrate(tweetsCount) {
  if (tweetsCount % 50 === 0) {
    celebrate(
      pickEmoji()
    );
  }
}