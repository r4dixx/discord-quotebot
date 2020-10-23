const config = require('./config.json');
var quotes = config.quotes;
var prefix = config.prefix;
var command = config.command;

var InfiniteLoop = require('infinite-loop');
var il = new InfiniteLoop;

function randomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
};
il.add(randomQuote, []);

il.run();

console.log(randomQuote());

var Discord = require("discord.js");
var bot = new Discord.Client();
var trigger = prefix + command

bot.on("message", (message) => {
  if (message.content == trigger) {
    message.channel.send(randomQuote());
  } else if (message.content.startsWith(trigger)) {
    // save quote here
    message.channel.send("**Citation enregistrée → **" + message.content.replace(trigger, "").substring(1));
  }
});

var ping = prefix + "ping"
bot.on("message", (message) => {
  if (message.content == ping) {
    message.channel.send("pong");
  } else if (message.content.startsWith(ping)) {
    message.channel.send(message.content.replace(ping, ""));
  }
});

bot.login(config.token);
