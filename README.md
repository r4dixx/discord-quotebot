Discord bot to output, save, and edit quotes upon commands.

# Setup in 10 steps

1.  Download [the latest release](https://github.com/r4dixx/QuoteBot/releases)

2.  Make sure nodeJs is installed. If it isn't [head up here](https://nodejs.org/en/download/package-manager/)

3.  `cd` to the root of this project and run `npm install` to install dependencies

4.  Edit [config.json](config.json) and customize it to your likings

    -   **Warning**: Some prefix/commands can cause conflicts with other bots. Careful what you wish for

5.  [Create a new Discord app](https://discordapp.com/developers/applications/me) and an associated bot account

6.  Copy your bot token and paste it into [config_private.json](config_private.json)  

    -   **Warning**: Do not commit this file as it contains private information

7.  Create a Discord invite with your Application Client ID and `send messages` permissions:

    -   `https://discordapp.com/oauth2/authorize?client_id=`CLIENT_ID_GOES_HERE`&scope=bot&permissions=2048`


8.  `cd` to the root of this project and run `node main.js` to start the bot

9.  Check if everything is up and running in your Discord server.

10. Profit

# Credits

This project is based upon [dekuraan/QuoteBot](https://github.com/dekuraan/QuoteBot). Thanks for giving me a starter point! I messed up with git and now the history is crap ¯\\\_(ツ)\_/¯ First original commits on Oct 23, 2020.
