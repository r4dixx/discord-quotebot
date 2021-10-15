# Discord QuoteBot 🤖
[![Latest release](https://img.shields.io/github/release/r4dixx/discord-quotebot.svg)](https://GitHub.com/r4dixx/discord-quotebot/releases/) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/r4dixx/discord-quotebot/graphs/commit-activity) [![License: GPL-3.0](https://img.shields.io/github/license/r4dixx/discord-quotebot)](https://github.com/r4dixx/discord-quotebot/blob/master/LICENSE) [![Twitter followers](https://img.shields.io/twitter/follow/r4dixx.svg?style=social)](https://twitter.com/r4dixx)

Discord bot to output, save, and edit quotes upon commands.

## 📖 Table of contents
- [👨‍💻 Available commands](#-available-commands)

- [🏁 Preliminary steps](#-preliminary-steps)
   - [Create an app](#create-an-app)
   - [Declare secrets](#declare-secrets)
   - [Important notes](#important-notes)

- [🏗 Setup](#-setup)
   - [Installation and first run](#installation-and-first-run)
   - [Test if everything is up and running](#test-if-everything-is-up-and-running)

- [✨ Customize the bot](#-customize-the-bot)

- [👤 About the author](#-about-the-author)
- [🤝 Contributing](#-contributing)
- [🤗 Show your support](#-show-your-support)
- [📝 License](#-license)

***

## 👨‍💻 Available commands

There are two types of commands. 

The most basic are available to everyone:

- Get a random quote → `/quote`
- Save a quote → `/save` your_quote
- Display help message → `/help`
- Test → `/ping`

The more advanced (i.e. touchy) commands are available to selected users called "captains". I called this privilege level that way to avoid any confusion with the term "server admins". Captains are not server admins, server admins are not captains.

Here are the available commands for captains:

- Edit last saved quote → `/edit` `last` new_quote
- Edit chosen quote → `/edit` `item` old_quote new_quote
- Delete last saved quote → `/delete` `last`
- Delete chosen quote → `/delete` `item` quote_to_delete

All these commands can be customized in [config.json](../src/config.json)

## 🏁 Preliminary steps

### Create an app

First we need to create a Discord app and its associated bot

1. [Create a new Discord app](https://discordapp.com/developers/applications/me) and give it a fancy name.

2. Add a bot in the bot section.

3. In the OAuth2 settings, set the scope to `application.commands`

4. Open the generated link and add the bot to your server.

### Declare secrets

In order to setup and run the project, you need to have the following environment variables set:

   - Your app OAuth2 client ID as `CLIENT_ID`. 
   - Your bot token as `TOKEN`.
   - Your server ID as `GUILD_ID`.
   - At least one user ID in `CAPTAIN_IDS` for edition/deletion rights.
   
   > You can add as many captains as you'd like but I recommend you keep it minimal.

There are [several ways to store these values](https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs). I personnally put them in an `.env` file in the root directory.

Grab [the latest release](https://github.com/r4dixx/discord-quotebot/releases/latest) and run the following commands:

```sh
$ cd discord-quotebot
$ touch .env
$ echo "CLIENT_ID=your_app_oauth2_client_id
TOKEN=your_bot_token
GUILD_ID=your_server_id
CAPTAIN_IDS=your_user_id, another_user_id, and_maybe_another >> .env
```

### Important notes

- Users declared as captains of this bot **are not** server admins, they are just users with the right to edit/delete quotes. In a similar fashion, server admins cannot edit/delete quotes unless they are specifically declared as captains.

- **Never** EVER share your environment with anyone. [See why](https://discordjs.guide/preparations/setting-up-a-bot-application.html#token-leak-scenario).

- Refer to the official documentation if you're lost
   - [Setting up a bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
   - [Where can I find my User/Server/Message ID?](https://support.discord.com/hc/articles/206346498)

## 🏗 Setup

### Installation and first run

Make sure you have [Node.js](http://nodejs.org/) **16.6 or higher** installed and run the following commands:

```sh
$ cd discord-quotebot
$ npm install
$ npm start
```

This will:

   - Install all the dependencies
   - Deploy commands to your server 
   - Start the bot

Your output should read `Successfully reloaded application commands.` and `Discord client ready`

If it doesn't, something went wrong. Your environment variables might be incorrect.

### Test if everything is up and running

Send `/ping` in your Discord server and see the magic happen.

If nothing shows, something went wrong. Check the logs for potential error messages.

## ✨ Customize the bot

All good? Now you can customize the bot by editing [../src/config.json](src/config.json).

This file in JSON format contains every commands and their associated configuration. Here's an example:

```json
{
   "insert": {
      "name": "save",
      "description": "Save given quote in the database",
      "option": {
         "name": "quote",
         "description": "Enter a quote you would like to save"
      },
      "reply": {
         "success": ":brain: **I'll remember this one...**",
         "error": {
            "mention": ":shushing_face: Not saving this one. Please don't mention people in quotes.",
            "duplicate": ":people_holding_hands: Error: This quote already exists."
         }
      }
   }
}
```

Everything can be customized pretty heavily so be creative! 

Once you're done, save the file and restart the bot to deploy your new configuration. 

Show me what you've done 🤗

***

## 👤 About the author

* Website: [r4dixx.github.io](https://r4dixx.github.io/)
* Twitter: [@r4dixx](https://twitter.com/r4dixx)
* Github: [@r4dixx](https://github.com/r4dixx)
* LinkedIn: [@r4dixx](https://linkedin.com/in/r4dixx)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check the [issues page](https://github.com/r4dixx/discord-quotebot/issues).

## 🤗 Show your support

Give a ⭐️ if you liked this project!

## 📝 License

Copyright © 2021 [r4dixx](https://github.com/r4dixx).<br />
This project is [GPL-3.0](https://github.com/r4dixx/discord-quotebot/blob/master/LICENSE) licensed.

***

_This README was partially generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
