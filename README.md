Discord bot to output, save, and edit quotes upon commands.

# Default commands

- Get a random quote → `!quote`
- Save a quote → `!quote` `your_quote`
- Edit last saved quote (admins only) → `!requote` `your_quote_edited`
- Edit chosen quote (admins only) → `!requote` `your_quote` `**>**` `your_quote_edited`
- Delete last saved quote (admins only) → `!unquote`
- Delete chosen quote (admins only) → `!unquote` `your_quote_to_delete`
- Display help message (admins only) → `!help` or mention the bot

These can be customized pretty heavily (see [config.json](src/config/config.json))

# Setup in 10 steps

1. Download [the latest release](https://github.com/r4dixx/QuoteBot/releases)

2. Make sure Node.js is installed. If it isn't [head up here](https://nodejs.org/en/download/package-manager/)

3. Run `npm install` to install dependencies

4. `cd src`

5. Edit [config.json](src/config/config.json) and customize it to your likings

    **Warning**: Some prefix/commands can cause conflicts with other bots. Careful what you wish for

6. [Create a new Discord app](https://discordapp.com/developers/applications/me) and an associated bot account. If you're lost, see [the official documentation](https://discordjs.guide/preparations/setting-up-a-bot-application.html).

7. Open [private.json](src/config/private.json) and:

    - Copy your bot account token and paste it into the `token` field. [see the official documentation](https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-token).

    - Paste your user ID in `botAdminIds`. This will give you more rights such quote edition, quote deletion, etc. You can add as many ids as you'd like but I recommend you tread carefully with this. If you don't know where to find your user ID, [check the official documentation](https://support.discordapp.com/hc/articles/206346498)

    **Warning**: Server admins and users declared as admins of this bot are two different things.

    **Warning 2**: Do not commit this file as it contains private information. To avoid accidents I recommend you run the following command when done with the steps above:

    - `git update-index --assume-unchanged config_private.json`

8. Create a Discord invite with `send messages` permissions and your application client ID:

    - `https://discordapp.com/oauth2/authorize?scope=bot&permissions=2048&client_id=YOUR_CLIENT_ID`

    For more details, [check the official documentation](https://discordjs.guide/preparations/adding-your-bot-to-servers.html) (you know the drill)

9. `cd` back to the root of this project and run `node app.js`

10. Check if everything is up and running in your Discord server (with `!ping` for instance).

Profit!

# Credits

This project is based upon [dekuraan/QuoteBot](https://github.com/dekuraan/QuoteBot). Thanks for giving me a starter point! I messed up with git and now the history is crap ¯\\\_(ツ)\_/¯ First original commits on Oct 23, 2020.
