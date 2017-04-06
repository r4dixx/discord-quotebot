# QuoteBot [![Travis](https://img.shields.io/travis/rust-lang/rust.svg)]()[![Github All Releases](https://img.shields.io/github/downloads/atom/atom/total.svg)]() [![node](https://img.shields.io/node/v/gh-badges.svg)]()
![ForTheBadge](http://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg)

A discord bot that outputs a random quote upon command

# Setup

1. install node.js if you don't already have it
2. `npm install discord.js`
3. `npm install discord.js`
4. `npm install infinite-loop`
5. Clone the project (`git clone https://github.com/EpicDJL/QuoteBot.git`) or download and extract the zip file.
6. Edit the config file
7. put the prefix and command of your choice
```json
{
    "prefix": "!",
    "command": "quote",
```
(This makes the command !quote)
8. create a bot on https://discordapp.com/developers/applications/me then create a bot account:
 @[youtube](https://www.youtube.com/watch?v=vsw5s5gKsR0) 
 
9. copy the "token" and paste it into the config file
```json
{
    "token": "right here :)"
```
10. format the quotes so that they each are a seperate line
```
quote 1
quote 2
quote 3
(no quotations)
```
11. got to http://textmechanic.com/text-tools/basic-text-tools/add-prefixsuffix-into-line/ and paste your quotes into the text box
12. put `"` in the prefix box and `",` into the suffix box, this shoud format your quotes like this
```
"quote 1",
"quote 2",
"quote 3",
```
13. paste it into the quote section in the config file. your config shoould now look like this:
```json
{
    "prefix": "prefix",
    "command": "command",
    "token": "token",
    "quotes":["quote 1",
    "quote 2",
    "quote 3",]
}
```
now remove the comma from the very last line.
14. create a discord invite by pasting your bot `Client Id` into where it says CLIENT_ID_GOES_HERE in this link: https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID_GOES_HERE&scope=bot&permissions=2097176631 
a. a box should pop up asking you to invite the bot to your discord server. choose which server you want and hit ok
15. run `node quote.js` to start the bot, it should output one of the random quotes as sign it is online.
16. Check your bot by typing the prefix and command you chose into discord.
# ----------Enjoy-----------
