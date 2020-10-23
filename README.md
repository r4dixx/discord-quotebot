A discord bot that outputs a random quote upon command  
Forked from https://github.com/dekuraan/QuoteBot

# Setup in 10 steps

1. Clone the project (`git clone https://github.com/EpicDJL/QuoteBot.git`)

2. Install nodejs

3. Run `npm install`

4. Edit the config file, put the prefix and command of your choice

```json
{
    "prefix": "/",
    "command": "quote",
```
(This makes the command `/quote`)  

5. create a bot on https://discordapp.com/developers/applications/me then create a bot account:
 
6. copy the "token" and paste it into the config file
```json
{
    "token": "right here :)"
```
7. insert quotes in the config file. your config should look like this:
```json
{
  "prefix": "/",
  "command": "quote",
  "token": "123456",
  "quotes": [
    "quote 1",
    "quote 2",
    "quote 3"
  ]
}
```

8. Create a discord invite by pasting your bot `Client Id` into where it says CLIENT_ID_GOES_HERE in this link: 
```
https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID_GOES_HERE&scope=bot&permissions=2097176631 
```
A box should pop up asking you to invite the bot to your discord server. choose which server you want and hit ok

9. run `node quote.js` to start the bot, it should output one of the random quotes as sign it is online.

10. Check your bot by typing the prefix and command you chose into discord.
