const toggleHelper = document.getElementById('js-toggleHelper');
const postHelper = document.getElementById('js-postHelper');
const headers = new Headers();
const entryForm = document.getElementById('entryForm')
const eventTextarea = document.getElementById('eventTextarea');
const dateSelect = document.getElementById('dateSelect');
const dateEvent = document.getElementById('dateEvent');
const checkCal = document.getElementById('checkCal');
const timeSelect = document.getElementById('timeSelect');
const timezoneSelect = document.getElementById('timezone');
const movieCount = document.getElementById('moviecount');
const movieSection = document.getElementById('moviesection');
const otherSection = document.getElementById('othersection');
const movieOption = document.getElementById('moovienight');
const otherOption = document.getElementById('other');
const otherFields = otherSection.querySelectorAll('input, textarea, select');
const movieFields = movieSection.querySelectorAll('input, textarea, select');
const movie1Fields = document.getElementsByClassName('moovie1');
const movie2Fields = document.getElementsByClassName('moovie2');
const movie3Fields = document.getElementsByClassName('moovie3');
const movie4Fields = document.getElementsByClassName('moovie4');
const reviewText = document.getElementById('reviewtext');
const eventTitle = document.getElementById('eventtitle');
const eventSum = document.getElementById('eventSum');
const timePost = document.getElementById('timepost');
const eventHost = document.getElementById('eventhost');
const postCopy = document.getElementById('postcopy');
const postCopySave = document.getElementById('postcopysave');
const copyTooltip = document.getElementById('copytooltip');
const saveStatus = document.getElementById('savestatus');
const saveForm = document.getElementById('saveForm');
const saveEvent = document.getElementById('saveEventConfirm');
const saveCancel = document.getElementById('saveEventCancel');
const askForHelp = document.getElementById('askforhelp');

window.addEventListener('DOMContentLoaded', (event) => {
  dateSelect.valueAsDate = new Date();
  dateEvent.valueAsDate = new Date();
  let guessTimeZone = moment.tz.guess();
  timezone.value = guessTimeZone;
});

entryForm.addEventListener('submit', onFormSubmit);
saveForm.addEventListener('submit', dateSave);

// if number of movies is changed
movieCount.addEventListener('change', function () {  
  const count = this.value;
  const countInt = parseInt(count);

  movieSection.classList = 'moviesection movie' + count;
  if (countInt == 1) {
    for (let item of movie2Fields) {
      item.setAttribute('hidden','');
      item.removeAttribute('required');
    };
    for (let item of movie3Fields) {
      item.setAttribute('hidden','');
      item.removeAttribute('required');
    };
    for (let item of movie4Fields) {
      item.setAttribute('hidden','');
      item.removeAttribute('required');
    };
  } 
  if (countInt >= 2) {
    for (let item of movie2Fields) {
      item.removeAttribute('hidden');
      item.setAttribute('required','');
    };
  } else {
    for (let item of movie2Fields) {
      item.removeAttribute('required');
      item.setAttribute('hidden','');
    };
  }
  if (countInt >= 3) {
    for (let item of movie3Fields) {
      item.removeAttribute('hidden');
      item.setAttribute('required','');
    };
  } else {
    for (let item of movie3Fields) {
      item.removeAttribute('required');
      item.setAttribute('hidden','');
    };
  }
  if (countInt == 4) {
    for (let item of movie4Fields) {
      item.removeAttribute('hidden');
      item.setAttribute('required','');
    };
  } else {
    for (let item of movie4Fields) {
      item.removeAttribute('required');
      item.setAttribute('hidden','');
    };
  }
});

// if moovie night is selected
movieOption.addEventListener('change', function() {
  movieCount.removeAttribute('hidden');
  for (let item of otherFields) {
    item.removeAttribute('required');
    item.setAttribute('hidden','');
  };
  for (let item of movie1Fields) {
    item.removeAttribute('hidden');
  };
  for (let item of movie1Fields) {
    item.setAttribute('required','');
  };
});

// if something else is selected
otherOption.addEventListener('change', function() {
  movieSection.classList = 'moviesection';
  movieCount.value = 1;
  for (let item of otherFields) {
    item.setAttribute('required','');
    item.removeAttribute('hidden','');
  };
  for (let item of movieFields) {
    item.removeAttribute('required');
    item.setAttribute('hidden','');
  };
});

async function dateFind() {
  event.preventDefault();
  let dateVal = dateSelect.value;
  eventTextarea.innerText = 'Searching for events...';
  checkCal.setAttribute('disabled','');
  headers.append("Content-Type", "application/json");

  const response = await fetch("https://eo1g5ocfjmiaypn.m.pipedream.net", {
    method: 'POST',
    body: new URLSearchParams({
      "date": dateVal
    })
  })
  const eventFound = await response.json();
  if (eventFound.event == 'undefined') {
    eventTextarea.innerText = 'There are no events scheduled on your chosen day. Please double-check the moovie thread to make sure!';
    dateEvent.value = dateSelect.value;
    checkCal.removeAttribute('disabled');
    toggleHelper.classList.toggle('collapsed');
  } else {
    eventTextarea.innerText = 'Someone has scheduled the event [' + eventFound.event + '] on your chosen day.';
    checkCal.removeAttribute('disabled');
  }
}

function eventRelDate(date, backup) {
  const today = moment().endOf('day')
  const tomorrow = moment().add(1, 'day').endOf('day')

  if (date < today) return 'TODAY'
  if (date < tomorrow) return 'TOMORROW'
  return backup
}

function makePost() {
  event.preventDefault();
  let evTitle = eventTitle.value;
  let dateVal = new Date(dateSelect.value + 'T' + timeSelect.value);
  let enteredDate = moment.tz(dateSelect.value + ' ' + timeSelect.value, timezoneSelect.value);
  let options = { month: 'long', day: 'numeric' }
  let evDate =  dateVal.toLocaleDateString(undefined, options); 
  let evTime = timeSelect.value;
  let announceDay = eventRelDate(new Date(dateSelect.value), evDate);
  let cleanEvent = (eventSum.value != '' ? eventSum.value.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2580-\u27BF]|\uD83E[\uDD10-\uDDFF]/g, '') : '');
  let movie1Title = '***' +  document.getElementsByClassName('moovietitle_1')[0].value + '***\n';
  let movie1Sum = '> ' + document.getElementsByClassName('mooviesum_1')[0].value + '\n';
  let movie2TitleVal = document.getElementsByClassName('moovietitle_2')[0].value;
  let movie2SumVal = document.getElementsByClassName('mooviesum_2')[0].value;
  let movie3TitleVal = document.getElementsByClassName('moovietitle_3')[0].value;
  let movie3SumVal = document.getElementsByClassName('mooviesum_3')[0].value;
  let movie4TitleVal = document.getElementsByClassName('moovietitle_4')[0].value;
  let movie4SumVal = document.getElementsByClassName('mooviesum_4')[0].value;
  let movie2Title = ((movie2TitleVal != '') ? '\n***' + movie2TitleVal + '***\n' : '');
  let movie3Title = ((movie3TitleVal != '') ? '\n***' + movie3TitleVal + '***\n' : '');
  let movie4Title = ((movie4TitleVal != '') ? '\n***' + movie4TitleVal + '***\n' : '');
  let movie2Sum = ((movie2SumVal != '') ? '> ' + movie2SumVal + '\n\n' : '');
  let movie3Sum = ((movie3SumVal != '') ? '> ' + movie3SumVal + '\n\n' : '');
  let movie4Sum = ((movie4SumVal != '') ? '> ' + movie4SumVal + '\n\n' : '');

  let convertedTzString = enteredDate.tz('Australia/Sydney').format('dd h:mmA z') + ' / '  + enteredDate.tz('Europe/Amsterdam').format('dd h:mmA z') + ' / ' + enteredDate.tz('Europe/London').format('dd h:mmA z') + ' / ' + enteredDate.tz('America/New_York').format('dd h:mmA z') + ' / ' + enteredDate.tz('US/Pacific').format('dd h:mmA z');

  reviewText.innerHTML = 'You want to host <mark>' + evTitle + '</mark> on <mark>' + evDate + '</mark> at <mark>' + evTime + '</mark> your local time.';
  
  if (otherOption.checked) {
    postCopy.value = '**' + announceDay + '**\n\n' + '***' + evTitle + '***\n' + '> ' + cleanEvent + '\n\n**SHOWTIME**\n' + convertedTzString + '\n\nhttps://cytu.be/r/moovieroom'; 
    postCopySave.value = '**' + announceDay + '**\n\n' + '***' + evTitle + '***\n' + '> ' + cleanEvent + '\n\n**SHOWTIME**\n' + convertedTzString + '\n\nhttps://cytu.be/r/moovieroom'; 
  } else {
    postCopy.value = '**' + announceDay + '**\n\n' + movie1Title + movie1Sum + movie2Title + movie2Sum + movie3Title + movie3Sum + movie4Title + movie4Sum + '\n**SHOWTIME**\n' + convertedTzString + '\n\nhttps://cytu.be/r/moovieroom'; 
    postCopySave.value = '**' + announceDay + '**\n\n' + movie1Title + movie1Sum + movie2Title + movie2Sum + movie3Title + movie3Sum + movie4Title + movie4Sum + '\n**SHOWTIME**\n' + convertedTzString + '\n\nhttps://cytu.be/r/moovieroom'; 
  }
}

function copyText() {
  event.preventDefault();
  postCopy.select();
  postCopy.setSelectionRange(0, 99999); // For mobile devices
  document.execCommand('copy');

  navigator.clipboard.writeText(postCopy.value);
  
  copyTooltip.innerHTML = 'copied!';
}

function outCopyFunc() {
  copyTooltip.innerHTML = 'click to copy';
}

function readyButtons() {
  saveEvent.removeAttribute('disabled');
  saveCancel.removeAttribute('disabled');
}

async function dateSave() {
    event.preventDefault();
    let dateVal = dateSelect.value;
    let saveTitle = eventTitle.value;
    let host = eventHost.value;
    let saveCopy = postCopy.value;
    let askedForHelp = askForHelp.checked;
    let enteredDate = moment.tz(dateSelect.value + ' ' + timeSelect.value, timezoneSelect.value);
    let startTime = enteredDate.tz('Europe/Amsterdam').format();
    let endTime = moment(startTime).add(3, 'hours').format();
    saveEvent.setAttribute('disabled','');
    saveCancel.setAttribute('disabled','');
    saveStatus.innerText = 'Saving your event...';
    headers.append("Content-Type", "application/json");

    const response = await fetch("https://eomucd6ns5g856v.m.pipedream.net", {
        method: 'POST',
        body: new URLSearchParams({
        "date": dateVal,
        "startTime": startTime,
        "endTime": endTime,
        "eventTitle": saveTitle,
        "postCopy": saveCopy,
        "modRequest": askedForHelp,
        "host": host
        }),
        error: function (status) {
            saveStatus.innerText = 'Something went wrong. Please retry.';
            saveEvent.removeAttribute('disabled');
            saveCancel.removeAttribute('disabled');
            alert('fail' + status.code);
        }
    })
    const saveResponse = await response.json();
    console.log(saveResponse);
    if (saveResponse.success == 'page') {
        saveStatus.innerText = 'Saved! All you have to do now is post your announcement and host your event!';
        saveEvent.innerText = 'saved!';
        saveCancel.innerText = 'close';
        saveCancel.removeAttribute('disabled');
        saveCancel.setAttribute( "onClick", "window.location.reload();" );
        entryForm.reset()
    } else {
        saveStatus.innerText = 'Something went wrong. Please retry.';
        saveEvent.removeAttribute('disabled');
        saveCancel.removeAttribute('disabled');
    }
}

toggleHelper.addEventListener('click', function (event) {
  postHelper.classList.toggle('collapsed');
  postHelper.scrollIntoView();
});

function onFormSubmit(event) {
	event.preventDefault();
	entryForm.checkValidity();
    if (entryForm.checkValidity() == true) {
        makePost();
        reviewdialog.showModal();
    }
}