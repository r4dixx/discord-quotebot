# Discord QuoteBot 🤖

[![npm version](https://badge.fury.io/js/@angular%2Fdiscord-quotebot.svg)](https://badge.fury.io/js/@r4dixx%2Fdiscord-quotebot) [![Node.js Package](https://github.com/r4dixx/discord-quotebot/actions/workflows/release-package.yml/badge.svg)](https://github.com/r4dixx/discord-quotebot/actions/workflows/release-package.yml) [![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/r4dixx/discord-quotebot#readme) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/r4dixx/discord-quotebot/graphs/commit-activity) [![License: GPL--3.0](https://img.shields.io/github/license/r4dixx/discord-quotebot)](https://github.com/r4dixx/discord-quotebot/blob/master/LICENSE) [![Twitter followers](https://img.shields.io/twitter/follow/r4dixx.svg?style=social)](https://twitter.com/r4dixx)

Discord bot to output, save, and edit quotes upon commands.

## 📖 Table of contents
- [Available commands](#-available-commands)
- [Preliminary steps](#-preliminary-steps)
   - [Important notes](#important-notes)
- [Customization](#-customization)
- [Setup](#-setup)
- [Test if everything is up and running](#-test-if-everything-is-up-and-running)
- [About the author](#-about-the-author)
- [Contributing](#-contributing)
- [Show your support](#-show-your-support)
- [License](#-license)

***

## 👨‍💻 Available commands

There are two types of commands. 

The most basic are available to everyone:

- Get a random quote → `/quote`
- Save a quote → `/save` your_quote
- Display help message → `/help`
- Test → `/ping`

The more advanced (i.e. touchy) commands are available to selected users called "captains". I called this privilege level that way to avoid any confusion with the term "server admins". Captains are not server admins, server admins are not captains. Anyway, these are the commands:

- Edit last saved quote → `/edit` `last` new_quote
- Edit chosen quote → `/edit` `item` old_quote new_quote
- Delete last saved quote → `/delete` `last`
- Delete chosen quote → `/delete` `item` quote_to_delete

All these commands can be customized in [commands.json](src/config/commands.json)

## 🏁 Preliminary steps

1. [Create a new Discord app](https://discordapp.com/developers/applications/me) and give it a fancy name.

2. In the OAuth2 settings, set the scope to `application.commands`, open the generated link and add the bot to your server.

2. Grab [the latest release](https://github.com/r4dixx/discord-quotebot/releases/latest)

3. Return to your app settings in the developer portal and open [src/.env](src/.env):

    - Copy/paste your OAuth2 client ID in the `CLIENT_ID` field.

    - Add a bot in the bot section and copy/paste its token in the `TOKEN` field.

    - Copy/paste your server ID in the `GUILD_ID` field.
    
    - In order to get edition and deletion rights, add your user ID to the `CAPTAIN_IDS` array. Check [the official support page](https://support.discordapp.com/hc/articles/206346498) for more info.

      > You can add as many captains as you'd like but I recommend you tread carefully. Keep it minimal.

   - **Immediately** run `git update-index --assume-unchanged src/.env` to avoid sharing this file with anyone. It contains private and sensitive information.

### Important notes

- Users declared as captains of this bot **are not** server admins. The opposite applies too.
- **Never** EVER share your `.env`. [See why](https://discordjs.guide/preparations/setting-up-a-bot-application.html#token-leak-scenario).
- If you're lost, see [the official documentation](https://discordjs.guide).

## ✨ Customization

Edit  [commands.json](src/config/commands.json) and customize it to your likings

> **Warning**: Some prefix/commands can cause conflicts with other bots!

## 🏗 Setup

Make sure you have [Node.js](http://nodejs.org/) **16.6 or higher** installed.

```sh
$ cd discord-quotebot
$ npm install
$ npm start
```

## 🧪 Test if everything is up and running

Send `/ping` in your Discord server and see the magic happen

***

## 👤 About the author

* Website: [r4dixx.github.io](https://r4dixx.github.io/)
* Twitter: [@r4dixx](https://twitter.com/r4dixx)
* Github: [@r4dixx](https://github.com/r4dixx)
* LinkedIn: [@r4dixx](https://linkedin.com/in/r4dixx)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check the [issues page](https://github.com/r4dixx/discord-quotebot/issues).

## 🤗 Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [r4dixx](https://github.com/r4dixx).<br />
This project is [GPL-3.0](https://github.com/r4dixx/discord-quotebot/blob/master/LICENSE) licensed.

***

_This README was partially generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
