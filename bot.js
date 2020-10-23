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
bot.on("message", (message) => {
  if (message.content.startsWith(prefix + command)) {
    message.channel.send(randomQuote());
  }
});

bot.on("message", (message) => {
  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("Pong!");
  }
});

bot.login(config.token);
