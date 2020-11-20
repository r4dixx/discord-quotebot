A discord bot that outputs a random quote upon command  

# Setup in 10 steps

1.  Clone the project

2.  Install nodejs

3.  Run `npm install`

4.  Edit [config.json](config.json) and customize to your likings

5.  Create an app on [https://discordapp.com/developers/applications/me](https://discordapp.com/developers/applications/me) and create a bot account

6.  Copy the "token" and paste it into [config_private.json](config_private.json)  

    -   **Warning**: Do not commit this file as it contains private information  

7.  Create a discord invite with your **Application** `Client Id` and proper permissions (`3072` = read and send messages) : `https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID_GOES_HERE&scope=bot&permissions=3072`

8.  Run `node main.js` to start the bot.

9.  Check your bot by typing the prefix and command you chose into Discord.

10. Profit

# Credits

This project is based upon [dekuraan/QuoteBot](https://github.com/dekuraan/QuoteBot). Thanks for giving me a starter point! I messed up with git and now the history is crap ¯\\\_(ツ)\_/¯ First original commits on Oct 23, 2020.
