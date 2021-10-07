# QuoteBot

Discord bot to output, save, and edit quotes upon commands.

- Get a random quote → `!quote`
- Save a quote → `!quote` `your_quote`
- Edit last saved quote (admins only) → `!requote` `your_quote_edited`
- Edit chosen quote (admins only) → `!requote` `your_quote` `**>**` `your_quote_edited`
- Delete last saved quote (admins only) → `!unquote`
- Delete chosen quote (admins only) → `!unquote` `your_quote_to_delete`
- Display help message (admins only) → `!help` or mention the bot

These can be customized pretty heavily in [src/config/config.json](src/config/config.json)

## Table of contents

- [Preliminary steps](#preliminary-steps)
   - [Important notes](#important-notes)
- [Setup](#setup)
   - [Locally](#locally)
   - [In the cloud](#in-the-cloud)
- [Customize](#customize)
- [Test if everything is up and running](#test-if-everything-is-up-and-running)

## Preliminary steps

1. [Create a new Discord app](https://discordapp.com/developers/applications/me) and an associated bot account.

2. Create a Discord invite with `send messages` permissions and your application client ID:

   `https://discordapp.com/oauth2/authorize?scope=bot&permissions=2048&client_id=YOUR_CLIENT_ID`

2. Grab [the latest release](https://github.com/r4dixx/QuoteBot/releases)

3. Open [src/config/private.json](src/config/private.json) and:

    - Copy your bot account token and paste it into the `token` field.

    - Paste your user ID in `botAdminIds`. _This will give you more rights (edition, deletion, etc). You can add as many admins as you'd like but I recommend you tread carefully._

### Important notes

- Users declared as admins of this bot **are not** server admins (and vice-versa)
- **Never** commit private information. To avoid accidents I recommend you run:
   
   `git update-index --assume-unchanged src/private.json`
   
- If you don't know where to find your user ID, [check the official support page](https://support.discordapp.com/hc/articles/206346498)
- If you're lost, see [the official documentation](https://discordjs.guide).

## Setup

### Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ cd QuoteBot
$ npm install
$ npm start
```

### In the cloud

Make sure you have the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ cd QuoteBot
$ heroku create
$ git push heroku main
```

## Customize

Edit [src/config/config.json](src/config/config.json) and customize it to your likings

**Warning**: Some prefix/commands can cause conflicts with other bots!

## Test if everything is up and running

Send `!ping` in your Discord server and see the magic happen
