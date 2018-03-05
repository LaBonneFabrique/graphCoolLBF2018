export default async event => {

var google = require('googleapis')
let privatekey = require("./privatekey2.json")
var idEvent = ''

const client = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ['https://www.googleapis.com/auth/calendar'],
    null
);

let calendar = google.calendar('v3')
function addEvent () {
    return new Promise(function (resolve, reject) {
     calendar.events.delete({
        auth: client,
        calendarId: 'fqtkc43frp32bd81btdploq4s0@group.calendar.google.com',
        eventId: event.data.eventId,
      }, function(err, eventBack) {
        if (err) {
          reject(err)
        }
        resolve(eventBack)
    }) 
  })
}

await addEvent().then((data) => {
  idEvent = data.id
}).catch((err) => {
  idEvent = 'erreur: '+err
})

return {
  data: {
    eventId: idEvent
  }
}

}