A discord bot that outputs a random quote upon command  
Forked from https://github.com/dekuraan/QuoteBot

Warning! The code is very messy. But hey it kinda works

# Setup in 10 steps

1. Clone the project (`git clone https://github.com/EpicDJL/QuoteBot.git`)

2. Install nodejs

3. Run `npm install`

4. Edit the config file and customize to your likings

5. create a bot on https://discordapp.com/developers/applications/me then create a bot account:
 
6. copy the "token" and paste it into the config file

7. Create a discord invite with your `Client Id` and give proper permissions (`3072` = read and send messages)
```
https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID_GOES_HERE&scope=bot&permissions=3072
```
A box should pop up asking you to invite the bot to your discord server. Choose which server you want and hit ok

8. Run `node quote.js` to start the bot, it should output one of the random quotes as sign it is online.

9. Check your bot by typing the prefix and command you chose into discord.

10. Profit
