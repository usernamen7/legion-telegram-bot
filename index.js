const TelegramBot  = require('node-telegram-bot-api');

const token = '493053739:AAHT_qwLxPa0mN7N4MUUu7dtKETXxSGKUtA';
const bot = new TelegramBot(token, {polling: true});

let notes = [];

bot.onText(/\/нагадай (.+) в (.+)/, (msg, match) => {
  let userId = msg.from.id;
  let text = match[1];
  let time = match[2];

  notes.push( {'userId':userId, 'time':time, 'text':text} );

  bot.sendMessage(userId, 'Ок, я нагадаю.');
  console.log(notes);
})

setInterval(() => {
  for (let i = 0; i < notes.length; i++) {
    let curDate = new Date().getHours() + ':' + new Date().getMinutes();
    if(notes[i]['time'] == curDate) {
      bot.sendMessage(notes[i]['userId'], `Нагадую, скоро ти повинен ${notes[i]['text']}`);
      notes.splice(i, 1);
    }
  }
}, 1000);


bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `Sup ${msg.from.first_name}` );
});

bot.onText(/\/list/, (msg) => {
  bot.sendMessage(msg.chat.id, "No data available.");
});


bot.on('message', (msg) => {

  let Hi = "hi";
  if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    bot.sendMessage(msg.chat.id, "Hello!");
  }

  let name = "who are you";
  if (msg.text.toString().toLowerCase().includes(name)) {
    bot.sendMessage(msg.chat.id, "We are Geth");
  }

  let location = "location";
  if (msg.text.indexOf(location) === 0) {
    bot.sendLocation(msg.chat.id,49.817944, 24.022583);
    bot.sendMessage(msg.chat.id, 'Here!')
  }
});
