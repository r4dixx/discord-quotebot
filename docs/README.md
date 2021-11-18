# Discord QuoteBot 🤖
[![Latest release](https://img.shields.io/github/release/r4dixx/discord-quotebot.svg)](https://GitHub.com/r4dixx/discord-quotebot/releases/) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/r4dixx/discord-quotebot/graphs/commit-activity) [![License: GPL-3.0](https://img.shields.io/github/license/r4dixx/discord-quotebot)](https://github.com/r4dixx/discord-quotebot/blob/master/LICENSE) [![Twitter followers](https://img.shields.io/twitter/follow/r4dixx.svg?style=social)](https://twitter.com/r4dixx)

This is an open-source quote bot written in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), using [Discord.js](https://discord.js.org/) as a client and [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore) as a database service. The goal of this project is to be both **extensible** and **easy** to setup.

Basic rights (read/save) are available to everyone.<br />
Advanced rights (edit/delete) are available to selected users called **_"captains"_**.

> I called this privilege level that way to prevent any confusion with the term "server admins".</br>
> Captains are not server admins, server admins are not captains.

Every commands and outputs can be customized heavily in [config.json](../src/config/config.json) as presented [here](#customize-the-bot).<br />
Head to [the "Usage" section](#-usage) for more info.

Let's go!

## 📖 Table of contents

- [🏁 Preliminary steps](#-preliminary-steps)
   - [Create a Discord bot](#create-a-discord-app)
   - [Create a Cloud Firestore database](#create-a-cloud-firestore-database)
   - [Important notes](#important-notes)

- [🏗 Setup](#-setup)
   - [Installation and first run](#installation-and-first-run)
   - [Test if everything is up and running](#test-if-everything-is-up-and-running)
   - [Customize the bot](#customize-the-bot)

- [👨‍💻 Usage](#-usage)
   - [All users](#all-users)
   - [Captains](#captains)

- [🤴 Advanced Usage](#-advanced-usage)
   - [Cloud Firestore Dashboard](#cloud-firestore-dashboard)

- [👤 About the author](#-about-the-author)
- [🤝 Contributing](#-contributing)
- [🤗 Show your support](#-show-your-support)
- [📝 License](#-license)

## 🏁 Preliminary steps

### Create a Discord app

First we need to create a Discord app and its associated bot

1. [Create a new Discord app](https://discordapp.com/developers/applications/me) and give it a fancy name.

2. Go to the bot settings and add a bot.

3. In the OAuth2 URL Generator settings, set the scope to `application.commands`

4. Copy the generated link and open it to your browser to add the bot to your server.

Now in order to run the project, you will need to have the following environment variables set:

- Your app OAuth2 client ID as `CLIENT_ID`. 
- Your bot token as `TOKEN`.
- Your server ID as `GUILD_ID`.
- At least one user ID in `CAPTAIN_IDS` (for more advanced rights)

> You can add as many captains as you'd like but I recommend you keep it minimal.

There are [several ways to store these values](https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs). I personnally put them in a `.env` file in the `config` directory.

Grab [the latest release](https://github.com/r4dixx/discord-quotebot/releases/latest) and create a `.env` file in `src/config`:

```sh
$ git clone git@github.com:r4dixx/discord-quotebot.git
$ cd discord-quotebot/src
$ touch config/.env
$ echo "CLIENT_ID=your_app_oauth2_client_id
TOKEN=your_bot_token
GUILD_ID=your_server_id
CAPTAIN_IDS=your_user_id, another_user_id, and_maybe_another" >> config/.env
```

**Don't share these info with anyone or you'll be open to malicious attacks! **

***

### Create a Cloud Firestore database

Now we're going to use a simple NoSQL cloud database to store our quotes.<br />
[Firebase Cloud Firestore](https://firebase.google.com/docs/firestore) is a good candidate for this kind of use case. 

It's pretty simple:

1. [Create a new Firebase project](https://console.firebase.google.com/) and [navigate to the "Firestore Database" section](https://console.firebase.google.com/project/_/firestore)

2. Create a database in **production mode** with the appropriate Cloud Firestore location (e.g. `eur3 (europe-west)`).

3. Choose an ID for your collection (e.g. `quotes`) and declare it in your `.env` file as follows: `COLLECTION_ID=quotes`. The name you chose will appear as such in the Firestore console.

Your `.env` file should look like this:

```
# Discord
CLIENT_ID=your_app_oauth2_client_id
TOKEN=your_bot_token
GUILD_ID=your_server_id
CAPTAIN_IDS=your_user_id

# Firebase
COLLECTION_ID=your_collection_name
```

Almost there! We just need to link up your Firebase project to your Discord bot.  

4. Head to your project settings and [navigate to the "Service Accounts" section](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk)

5. Click on `Create service account` and `Generate new private key` (this will download a `*.json` file for you)

6. Move the downloaded file to [the config directory](../src/config) and make sure to rename it `firebase.json`. Do not share it with anyone! 

That's it! Now we can go to the last step.

***

### Important notes

- Users declared as captains **are not** server admins, they are just users with the right to edit/delete quotes. In a similar fashion, server admins cannot edit/delete quotes unless they are specifically declared as captains.

- **Never** EVER share your environment with anyone. [See why](https://discordjs.guide/preparations/setting-up-a-bot-application.html#token-leak-scenario).

- Everything in `firebase.json` must remain strictly confidential. In a similar fashion, your Cloud Firestore security rules should be strictly in **production mode**. [See why](https://firebase.google.com/docs/rules/basics).

- Refer to the official documentations if you're lost
   - [Setting up a bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
   - [Where can I find my User/Server/Message ID?](https://support.discord.com/hc/articles/206346498)
   - [Get started with Cloud Firestore](https://firebase.google.com/docs/firestore/quickstart?hl=en#node.js)

## 🏗 Setup

### Installation and first run

Make sure you have [Node.js](http://nodejs.org/) **16.6 or higher** installed and run the following commands:

```sh
$ cd discord-quotebot/src
$ npm install
$ npm start
```

This will:

- Install all the dependencies
- Deploy commands to your server 
- Start the bot

Your log output should read the following:

- `Successfully reloaded application commands` which confirms that the commands have been deployed to your server.
- `Discord client ready! Logged in as QuoteBot-Test - ID: your_client_id` which confirms that the bot is running.
- `Instance of Firebase Cloud Firestore initalized properly` which confirms that the database is ready.

If you didn't get **these three messages**, something went wrong. 

1. Check the location of your `.env` file
2. Double check your environment variables.
3. Triple check your Firebase project configuration.

If this still doesn't fix your problem, please [open an issue](https://github.com/r4dixx/discord-quotebot/issues/new).

***

### Test if everything is up and running

Send `/ping` in your Discord server and see the magic happen.<br />
If nothing shows, something went wrong. Check the logs for potential error messages. 

Please [open an issue](https://github.com/r4dixx/discord-quotebot/issues/new) if you see anything unusual.

***

### Customize the bot

All good? Now you can customize the bot by editing [config.json](../src/config/config.json).<br />
This file in JSON format contains every commands and their associated configuration. 

Here's an example:

```json
{
  "add": {
    "name": "add",
    "description": "Add given quote to the collection",
    "option": {
      "name": "quote",
      "description": "Enter a quote you would like to add"
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

Everything can be customized pretty heavily so be creative!<br />
Once you're done, save the file and restart the bot to deploy your new configuration.<br />
Show me what you've done 🤗

## 👨‍💻 Usage

### All users

- `/quote` to get a random quote
- `/save` to save a quote
- `/help` to get a list of available commands
- `/ping` to test if the bot is running

### Captains

- Edit
   - `/edit` `last` `new_quote` to edit last saved quote
   - `/edit` `item` `old_quote` `new_quote` to edit a specific quote

- Delete 
   - `/delete` `last` to delete last saved quote
   - `/delete` `item` `quote` to delete a specific quote

## 🤴 Advanced usage

### Cloud Firestore Dashboard

Remember the dashboard? It's a great way to manage your collection. You can find it [here](https://console.firebase.google.com/project/_/firestore/data/)<br /> and access it anytime you want. No need to touch this folder again!

From there you can add, edit and delete documents very easily. You can even change creation dates!

Two things to note:

- Adding new fields to a document does nothing and can lead to issues. Please only use existing fields.
- Editing IDs is not recommended. This might break your bot.

Have fun 👋

_Psst! If this is unclear for you: in the Cloud Firestore world collections are some kind of sub-databases, documents are tables and fields are entries_

## 👤 About the author

- Website: [r4dixx.github.io](https://r4dixx.github.io/)
- Twitter: [@r4dixx](https://twitter.com/r4dixx)
- Github: [@r4dixx](https://github.com/r4dixx)
- LinkedIn: [@r4dixx](https://linkedin.com/in/r4dixx)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />
Feel free to check the [issues page](https://github.com/r4dixx/discord-quotebot/issues).

## 🤗 Show your support

Give a ⭐️ if you liked this project!

## 📝 License

Copyright © 2021 [r4dixx](https://github.com/r4dixx).<br />
This project is [GPL-3.0](https://github.com/r4dixx/discord-quotebot/blob/master/LICENSE) licensed.

***

_This README was partially generated using [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
