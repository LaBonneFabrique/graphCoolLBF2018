export default async event => {
  // you can use ES7 with async/await and even TypeScript in your functions :)
var google = require('googleapis')
let privatekey = require("./privatekey2.json")
var messageRetour = []

const client = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ['https://www.googleapis.com/auth/calendar'],
    null
);


let calendar = google.calendar('v3');
function fetchEventsList () {
return new Promise(function (resolve, reject) {
 calendar.events.list({
 auth: client,
 maxResults: 10,
 timeMax: '2018-02-03T10:00:00-07:00',
 timeMin: '2018-01-20T10:00:00-07:00',
 calendarId: 'fqtkc43frp32bd81btdploq4s0@group.calendar.google.com'//whatever
}, function (err, response) {
if (err) {
 reject(err)
}
else {
 resolve(response.items)
}
})
})
}

/*, function (err, response) {
 if (err) {
   console.log(err)
 }
 else {
  return {
  data: {
    message: response.items
  }
}
 }
})

return {
  data: {
    message: [{texte: 'pif !'}]
  }
}
*/
await fetchEventsList().then((data) => {
  messageRetour = data
}).catch((error) => {
  messageRetour = error
})

return {
  data: {
    message: messageRetour
  }
}
  
 }