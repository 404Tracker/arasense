document.getElementById('yes').addEventListener('click', function(e) {
  console.log('yes');
  document.getElementById('avatar').classList.toggle('blur-6');
  document.getElementById('username').classList.toggle('blur-6');
  document.getElementById('twitter-handle').classList.toggle('blur-6');
  document.getElementById('tweet-body').classList.toggle('blur-6');

  setTimeout(function() {
    document.getElementById('tweet').classList.toggle('translate-x-100per');
    document.getElementById('number').innerHTML = parseInt(document.getElementById('number').innerText) + 1;
  }, 3000);
});
document.getElementById('dontKnow').addEventListener('click', function(e) {
  console.log('I don\'t know');
});
document.getElementById('no').addEventListener('click', function(e) {
  console.log('no');
});