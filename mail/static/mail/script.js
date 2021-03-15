var first = true;

function updateLetterColors(mode="dark") {
  if (mode=="dark") {
      document.querySelectorAll('.email-line').forEach(line => {
        line.style.color="white";
      })
  }
  else {
    document.querySelectorAll('.email-line').forEach(line => {
      line.style.color="black";
    })
  }
}

function updateBackroundColor(mode="dark") {
  const theme_switch = document.querySelector('#switch-1');
  document.querySelectorAll('.btn').forEach(pop => {
    pop.style.color = theme_switch.checked ? "white" : "white";
    pop.style.backgroundColor = theme_switch.checked ? "rgb(130, 92, 156)" : "blue";
    pop.style.borderColor = theme_switch.checked ? "rgb(130, 92, 156)" : "blue";
  })
  if (mode=="dark") {
      document.querySelector('#main-inbox-container').style.backgroundColor="rgb(39, 12, 57)";
      document.querySelectorAll('.email-line-unread').forEach(line => {
        line.style.backgroundColor="rgb(130, 92, 156)";
      })
      document.querySelectorAll('.email-pop-up').forEach(line => {
        line.style.backgroundColor="grey";
      })
  }
  else {
    document.querySelector('#main-inbox-container').style.backgroundColor="#c3dded";
    document.querySelectorAll('.email-line-unread').forEach(line => {
      line.style.backgroundColor="rgb(218, 244, 247)";
    })
    document.querySelectorAll('.email-pop-up').forEach(line => {
      line.style.backgroundColor="inherit";
    })  }
}

function updateNavBarColor(mode="dark") {
  if (mode=="dark") {
    document.querySelectorAll('.my-navbar').forEach(bar => {
      //bar.style.backgroundColor="#c3dded";
      bar.style.backgroundColor="rgb(147, 124, 163)";
      bar.style.color="white"
    })
    document.querySelectorAll('.nav-header').forEach(bar => {
      //bar.style.backgroundColor="#c3dded";
      bar.style.backgroundColor="rgb(147, 124, 163)";
      bar.style.color="white"
    })
    document.querySelectorAll('.my-nav-link').forEach(bar => {
      bar.style.color="white"
    })
    document.querySelectorAll('.title').forEach(bar => {
      bar.style.color="white"
    })
    document.querySelectorAll('.relative-title').forEach(bar => {
      bar.style.color="white"
    })
    document.querySelectorAll('.inbox-main-page-container').forEach(bar => {
      bar.style.borderLeft="0.5px solid white"
    })
    document.querySelectorAll('.nav-header').forEach(bar => {
      bar.style.borderBottom="0.5px solid white"
    })
    document.querySelectorAll('label').forEach(bar => {
      bar.style.color="white"
    })    
    document.querySelectorAll('hr').forEach(bar => {
      bar.style.borderColor="white"
    })    
  }
  else {
    document.querySelectorAll('.my-navbar').forEach(bar => {
      bar.style.backgroundColor="white";
      bar.style.color="black"
    })
    document.querySelectorAll('.nav-header').forEach(bar => {
      bar.style.backgroundColor="white";
      bar.style.color="black"
    })   
    document.querySelectorAll('.my-nav-link').forEach(bar => {
      bar.style.color="blue"
    })
    document.querySelectorAll('.title').forEach(bar => {
      bar.style.color="blue"
    })
    document.querySelectorAll('.relative-title').forEach(bar => {
      bar.style.color="black"
    })
    document.querySelectorAll('.inbox-main-page-container').forEach(bar => {
      bar.style.borderLeft="0.5px solid grey"
    })
    document.querySelectorAll('.nav-header').forEach(bar => {
      bar.style.borderBottom="0.5px solid grey"
    })
    document.querySelectorAll('label').forEach(bar => {
      bar.style.color="black"
    })
    document.querySelectorAll('hr').forEach(bar => {
      bar.style.borderColor="grey"
    })               
  }
}

function updateModalColor() {
  const theme_switch = document.querySelector('#switch-1');

  document.querySelectorAll('.email-popup').forEach(pop => {
    pop.style.backgroundColor = theme_switch.checked ? "rgb(147, 124, 163)" : "white";
  })
  document.querySelectorAll('hr').forEach(bar => {
    bar.style.borderColor= theme_switch.checked ? "white" : "grey";
  })    
  document.querySelectorAll('.sender-pop').forEach(pop => {
    pop.style.color = theme_switch.checked ? "white" : "black";
  })
  document.querySelectorAll('.subject-pop').forEach(pop => {
    pop.style.color = theme_switch.checked ? "white" : "black";
  })
  document.querySelectorAll('.body-pop').forEach(pop => {
    pop.style.color = theme_switch.checked ? "white" : "black";
  })
  document.querySelectorAll('.timestamp-pop').forEach(pop => {
    pop.style.color = theme_switch.checked ? "white" : "black";
  })
  document.querySelectorAll('.btn').forEach(pop => {
    pop.style.color = theme_switch.checked ? "white" : "white";
    pop.style.backgroundColor = theme_switch.checked ? "rgb(39, 12, 57)" : "blue";
    pop.style.borderColor = theme_switch.checked ? "rgb(39, 12, 57)" : "blue";
  })
}

function updateColors() {
  const theme_switch = document.querySelector('#switch-1');
  console.log("change lighting theme");
  if (theme_switch.checked) {
      mode="dark";
  }
  else {
      mode="light";
  }
  //updateOtherColors(mode);
  updateBackroundColor(mode);
  updateNavBarColor(mode);
  updateLetterColors(mode);
}

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
  console.log(JSON.stringify({
    recipients: recipients.value,
    subject: subject.value,
    body: body.value,
  }));
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
    console.log(result);
    setTimeout(load_mailbox('sent', result.message, 'green'), 2000);
  })
  .catch(err => {
    console.log(err);
  })
  event.preventDefault();
}

function fillBox(data) {
  const container = document.querySelector('#emails-container');
  container.innerHTML = "";
  const category = document.querySelector('#inbox-title').innerHTML;
  let haveUnread = false;
  if (!data.length) {
    console.log("no data");
    setTimeout( () => {
      const messageBox = document.querySelector('#message');
      switch(category) {
        case "Inbox":
          messageBox.innerHTML = `Your inbox is empty`;
          break;
        case "Archive":
          messageBox.innerHTML = `You don't have any archived messages`;
          break;
      }
      messageBox.style.color="red";
      messageBox.style.fontWeight="bold";}, 1000
    )
  }
  data.forEach(email => {
    const newEmail = document.createElement('div');
    newEmail.classList.add('email-line');
    if (email.read===false) {
      haveUnread = true;
      newEmail.classList.add('email-line-unread');
    }
    newEmail.setAttribute('mailid', email.id);
    const sender = document.createElement('div');
    const subject = document.createElement('div');
    const timestamp = document.createElement('div');
    sender.classList.add('column-1');
    subject.classList.add('column-2');
    timestamp.classList.add('column-3');
    if (category!=="Sent") {    
      sender.innerHTML = `${email.sender}`;
    }
    else {
      sender.innerHTML = `${email.recipients}`
    }
    subject.innerHTML = `${email.subject}`;
    timestamp.innerHTML = `${email.timestamp.substr(0, email.timestamp.indexOf('2021'))}`;

    newEmail.appendChild(sender);
    newEmail.appendChild(subject);
    newEmail.appendChild(timestamp);

    container.appendChild(newEmail);
    
    newEmail.addEventListener('click', (event) => showMailPop(event));
    updateColors();
    if (haveUnread) {
      const messageBox = document.querySelector('#message');
      messageBox.innerHTML = "You have some unread messages";
      messageBox.style.color="green";
      messageBox.style.fontWeight="bold";
      setTimeout(() => {
        messageBox.innerHTML=""
      }, 2000);
    }
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
  const receivers = document.createElement('h5');
  receivers.classList.add('sender-pop');
  const body = document.createElement('div');
  body.classList.add('body-pop');
  const timestamp = document.createElement('div');
  timestamp.classList.add('timestamp-pop');
  sender.innerHTML = `From: ${data.sender}`;
  receivers.innerHTML = `To: ${data.recipients}`
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
  popup.appendChild(receivers);
  const hr = document.createElement('hr');
  const hr2 = document.createElement('hr');
  popup.appendChild(hr);
  popup.appendChild(subject);
  popup.appendChild(hr2);
  popup.appendChild(body);

  popup.appendChild(timestamp);

  popup.appendChild(buttonContainer);

  updateModalColor();
}

const outsideClickListener = (event) => {
  console.log("clicked at: " + event.target);
  if (!first) {
    console.log("pop up is opened");
    if (document.querySelector('#pop-up-box')) {
      const popup = document.querySelector('#pop-up-box');
      const emailsContainer = document.querySelector('#emails-container')
      if (!popup.contains(event.target) && !emailsContainer.contains(event.target)) {
        popup.style.display="none";
        popup.innerHTML = "";
        removeClickListener();
      }
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

  const theme_switch = document.querySelector('#switch-1');
  theme_switch.onchange = () => {
      updateColors();
  }
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

function load_mailbox(mailbox, message="", messageColor="") {
  console.log('chose inbox');
  showInbox();
  // Show the mailbox name
  const inboxTitle = document.querySelector('#inbox-title');
  inboxTitle.innerHTML =  `${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}`
  //document.querySelector('#emails-view').innerHTML = `<h3></h3>`;
  const category = document.querySelector('#inbox-title').innerHTML;
  if (category!=="Archive") {
    const messageBox = document.querySelector('#message');
    messageBox.innerHTML = message;
    if (messageColor!=="") {
      messageBox.style.color=messageColor;
      messageBox.style.fontWeight="bold";
    }
    messageBox.innerHTML=""
  }
  else {
    const messageBox = document.querySelector('#message');
    messageBox.innerHTML = "";
  }
  fetch(`/emails/${mailbox}`)
  .then(response =>  response.json())
  .then(data => {
    console.log(data);
    setTimeout(fillBox(data), 500);
  })
  .catch(err => {
    console.log(err);
  })
}