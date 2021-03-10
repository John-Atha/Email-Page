var first = true;

function showCompose() {
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
}

function showInbox() {
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
}

function sendmail(event) {
  const recipients = document.querySelector('#compose-recipients');
  const subject = document.querySelector('#compose-subject');
  const body = document.querySelector('#compose-body');

  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: recipients.value,
      subject: subject.value,
      body: body.value,
    })
  })
  .then(response => response.json())
  .then(result => {
    console.log(result)
  })
  .catch(err => {
    console.log(err);
  })
  event.preventDefault();
}

function fillBox(data) {
  const container = document.querySelector('#emails-container');
  container.innerHTML = "";
  data.forEach(email => {
    const newEmail = document.createElement('div');
    newEmail.classList.add('email-line');
    if (email.read===false) {
      newEmail.classList.add('email-line-unread');
    }
    newEmail.setAttribute('mailid', email.id);
    const sender = document.createElement('div');
    const subject = document.createElement('div');
    const timestamp = document.createElement('div');
    sender.classList.add('column-1');
    subject.classList.add('column-2');
    timestamp.classList.add('column-3');
        
    sender.innerHTML = `${email.sender}`;
    subject.innerHTML = `${email.subject}`;
    timestamp.innerHTML = `${email.timestamp.substr(0, email.timestamp.indexOf('2021'))}`;

    newEmail.appendChild(sender);
    newEmail.appendChild(subject);
    newEmail.appendChild(timestamp);

    container.appendChild(newEmail);
    
    newEmail.addEventListener('click', (event) => showMailPop(event));
  });
}

function unRead(id) {
  console.log(`Making ${id} unread`);
  fetch(`/emails/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      read: false,
    })
  })
  let currLines = document.querySelectorAll(`.email-line`);
  currLines.forEach(line => {
    if (line.getAttribute('mailid')==id) {
      line.classList.add('email-line-unread');
    }
  })
  
}

function archive(id) {
  console.log(`Sending ${id} to archive`);
  fetch(`emails/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      archived: true,
    })
  })
  let currLines = document.querySelectorAll(`.email-line`);
  currLines.forEach(line => {
    if (line.getAttribute('mailid')==id) {
      line.style.display = "none";
    }
  })
}

function unArchive(id) {
  console.log(`Removing ${id} to archive`);
  fetch(`emails/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      archived: false,
    })
  })
  let currLines = document.querySelectorAll(`.email-line`);
  currLines.forEach(line => {
    if (line.getAttribute('mailid')==id) {
      line.style.display = "none";
    }
  })
}


function fillpopup(popup, data, id) {
  popup.innerHTML = "";
  const subject = document.createElement('div');
  subject.classList.add('subject-pop');
  const sender = document.createElement('h5');
  sender.classList.add('sender-pop');
  const body = document.createElement('div');
  body.classList.add('body-pop');
  const timestamp = document.createElement('div');
  timestamp.classList.add('timestamp-pop');
  sender.innerHTML = `From: ${data.sender}`;
  subject.innerHTML = data.subject;
  body.innerHTML = data.body;
  timestamp.innerHTML = data.timestamp;

  const buttonContainer = document.createElement('div');
  const unreadButton = document.createElement('button');
  const archButton = document.createElement('button');

  timestamp.classList.add('margin-top-small');

  buttonContainer.classList.add('flex-layout');
  buttonContainer.classList.add('margin-top');
  buttonContainer.classList.add('center-content');
  //unreadButton.classList.add('flex-item');
  //archButton.classList.add('flex-item');

  const inboxTitle = document.querySelector('#inbox-title');

  if (inboxTitle.innerHTML==="Inbox") {
    unreadButton.classList.add('btn');
    unreadButton.classList.add('btn-primary');
    unreadButton.classList.add('button-small-flex');
    unreadButton.innerHTML = "Mark as unread";
    buttonContainer.appendChild(unreadButton);
    unreadButton.onclick = () => {
      popup.style.display="none";
      popup.innerHTML = "";
      removeClickListener();
      let mailId = id;
      unRead(mailId);
    }
  }

  if (inboxTitle.innerHTML!=="Archive") {
    archButton.classList.add('btn');
    archButton.classList.add('btn-primary');
    archButton.classList.add('button-small-flex');

    /*unreadButton.setAttribute('mail-id', id);
    archButton.setAttribute('mail-id', id);*/

    archButton.innerHTML = "Send to archived";
    buttonContainer.appendChild(archButton);

    archButton.onclick = () => {
      popup.style.display="none";
      popup.innerHTML = "";
      removeClickListener();
      let mailId = id;
      archive(mailId);
    }
  }

  if (inboxTitle.innerHTML==="Archive") {
    archButton.classList.add('btn');
    archButton.classList.add('btn-primary');
    archButton.classList.add('button-small-flex');

    /*unreadButton.setAttribute('mail-id', id);
    archButton.setAttribute('mail-id', id);*/

    archButton.innerHTML = "Remove from archived";
    buttonContainer.appendChild(archButton);

    archButton.onclick = () => {
      popup.style.display="none";
      popup.innerHTML = "";
      removeClickListener();
      let mailId = id;
      unArchive(mailId);
    }
  }



  popup.appendChild(sender);
  const hr = document.createElement('hr');
  const hr2 = document.createElement('hr');
  popup.appendChild(hr);
  popup.appendChild(subject);
  popup.appendChild(hr2);
  popup.appendChild(body);

  popup.appendChild(timestamp);

  popup.appendChild(buttonContainer);

}

const outsideClickListener = (event) => {
  console.log("clicked at: " + event.target);
  if (!first) {
    console.log("pop up is opened");
    const popup = document.querySelector('#pop-up-box');
    const emailsContainer = document.querySelector('#emails-container')
    if (!popup.contains(event.target) && !emailsContainer.contains(event.target)) {
      popup.style.display="none";
      popup.innerHTML = "";
      removeClickListener();
    }
  }
  else {
    first = false;
  }
}

const removeClickListener = () => {
  document.removeEventListener('click', outsideClickListener)
}

function showMailPop(event) {
  console.log(event);
  console.log(event.target);
  console.log(event.target.parentElement);
  console.log(event.target.parentElement.getAttribute('mailid'));
  const id = event.target.parentElement.getAttribute('mailid');
  //change unread decoration
  event.target.parentElement.classList.remove('email-line-unread');
  // make a put request to this id to make it read
  fetch(`/emails/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      read: true,
    })
  })
  let popup=null;
  if (document.querySelector('#pop-up-box')===null) {
    console.log("------pop up not created yet");
    popup = document.createElement('div');
    popup.classList.add('email-popup');
    popup.setAttribute('mail-id', id);
    popup.setAttribute('id', 'pop-up-box');

    document.querySelector('#main-inbox-container').appendChild(popup);
  }
  else {
    console.log("------pop up already created");
    popup = document.querySelector('#pop-up-box');
    popup.style.display='block';
    setTimeout( document.addEventListener('click', outsideClickListener),
      1000);
  }

  fetch(`/emails/${id}`)
  .then(response =>  response.json())
  .then(data => {
    console.log(data);
    fillpopup(popup, data, id);
  })
  .catch(err => {
    console.log(err);
  })
}

document.addEventListener('DOMContentLoaded', function() {
  console.log("welcome");
  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

 document.addEventListener('click', outsideClickListener);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  showCompose();
  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
  const send = document.querySelector('#send-mail');
  send.addEventListener('click', (event) => sendmail(event));

}

function load_mailbox(mailbox) {
  console.log('chose inbox');
  showInbox();
  // Show the mailbox name
  const inboxTitle = document.querySelector('#inbox-title');
  inboxTitle.innerHTML =  `${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}`
  //document.querySelector('#emails-view').innerHTML = `<h3></h3>`;
  fetch(`/emails/${mailbox}`)
  .then(response =>  response.json())
  .then(data => {
    console.log(data);
    fillBox(data);
  })
  .catch(err => {
    console.log(err);
  })
}