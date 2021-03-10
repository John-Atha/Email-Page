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

function showMailPop(event) {
  console.log(event);
  console.log(event.target);
  console.log(event.target.parentElement);
  console.log(event.target.parentElement.getAttribute('mailid'));
  const id = event.target.parentElement.getAttribute('mailid');


}

document.addEventListener('DOMContentLoaded', function() {
  console.log("welcome");
  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  
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