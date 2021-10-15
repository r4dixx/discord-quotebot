# Changelog

## 4.1.0

### Feature

- Remove bin support as it is broken for now
- Switch to a better approach regarding secrets

### Documentation

- Improve documentation

### Tech

- Migrate client init and interaction creation related logics to dedicated `events` folder
- Review architecture and package scripts
- Improve logs
- Refactoring and cleanup

## 4.0.1

### Fix

- Fix project name for npm package

### Documentation

- Remove Heroku steps as it does not support database persistence
- Review some wording

### Tech

Update dependencies

## 4.0.0

### Feature

- **BREAKING CHANGE** - Migrate to discord.js v13
    - Install NodeJS 16.6.0 or higher
    - `rm -rf node_modules` 
    - `npm install`

- Add support for discord commands, subcommands and options
- Add support for threads
- Add server field (aka guild) in `private.json`

### Fix

- Fix help displayed when bot mentionned
- Fix db file path not being interpreted strictly

### Documentation

- Review badges
- Review steps

### Tech

- Update dependencies
- Cleanup, refacto, renaming

And much more!

---

## 3.5.5

### Fix

**HOTFIX:** Revert this hell of a mess. ¯\\\_(ツ)\_/¯

## 3.5.4

### Fix

**HOTFIX:** Fix bin support

## 3.5.3

### Fix

**HOTFIX:** Fix incorrect Discord version which broke everything

## 3.5.2

### Fix

Add missing bin support
Fix workflow (again)

## 3.5.1

### Fix

Fix workflow

## 3.5.0

### Tech

Setup action to publish packages

---

## 3.4.4

### Tech

Fix package.json urls

## 3.4.3

### Fix

Fix package name for publication

### Documentation

Review badges in README.md

## 3.4.2

### Fix

Add missing `Procfile`

### Documentation

Add missing Heroku related commands

## 3.4.1

### Documentation

Fix wrong link in README.md 

## 3.4.0

### Documentation

Improve README.md
Add Heroku steps

### Tech

Improve stability
Update dependencies

---

## 3.3.0

### Feature

- Prevent mentions in quotes

### Fix

- Review logs (specifically add missing one for insertion)

### Documentation

- Fix wrong command provided for ignoring private json file

### Tech

- Update `node-addon-api` 3.1.0 ([changelog](https://github.com/nodejs/node-addon-api/releases/tag/3.1.0))
- Update `sqlite3` 5.0.2 ([changelog](https://github.com/mapbox/node-sqlite3/releases/tag/v5.0.2))
- Update `string_decoder` 1.1.1 ([changelog](https://github.com/nodejs/string_decoder/releases/tag/v1.1.1))

---

## 3.2.0

### Feature

- More customization for feedback messages
- Clearer feedback messages

### Fix

- Prevent duplicates in database
- Fix mentions not being stored correctly
- Fix dm support

### Tech

- Big architecture overhaul
- Create formatter.js
- Performance and stability improvements
- Cleanup
- Fix security vulnerability (see [#7](https://github.com/r4dixx/QuoteBot/pull/7))
- Update `discord.js` 12.5.1 ([changelog](https://github.com/discordjs/discord.js/releases/tag/12.5.1))
- Update `mime-db` 1.45.0 ([changelog](https://github.com/jshttp/mime-db/releases/tag/v1.45.0))
- Update `mime-types` 2.1.28 ([changelog](https://github.com/jshttp/mime-types/releases/tag/2.1.28))
- Update `ms` 2.1.3 ([changelog](https://github.com/vercel/ms/releases/tag/2.1.3))
- Update `ws` 7.4.2 ([changelog](https://github.com/websockets/ws/releases/tag/7.4.2))

---

## 3.1.2

### Fix

- CRITICAL : Fix check rights spamming

## 3.1.1

### Documentation

- Add missing documentation (commands)
- Fix typos

## 3.1.0

### Fix

- Fix separator (changed in favor of a more reliable one)
- Fix wording

---

## 3.0.0

### Feature

- Edit quote using `!requote` `your_quote` `**>**` `your_quote_edited`
- Edit last saved quote using `!requote` `your_quote_edited`

### Fix

- Fix and improve formatting
- Improve stability

### Tech

- Review model (see config/config.json)
- Improve code readability
- Improve separation of concerns
- Update `discord.js` 12.5.0 ([changelog](https://github.com/discordjs/discord.js/releases/tag/12.5.0))

---

## 2.0.0

### Feature

- Delete quote using `!unquote` `your_quote`
- Undo last saved quote using `!unquote`
- Bot admins
- More configuration options

### Fix

- Improve stability

### Documentation

- Clearer and more complete steps
- Links to official documentation
- Disclaimers for sensible steps

### Tech

- Better project decoupling (with commandHandler.js for instance)

---

## 1.1.0

### Feature

- Add alt commands

### Fix

- Update commands to avoid conflicts
- Make help friendlier to use and to understand
- Review formatting

### Documentation

- Improve README.md
- Warn about private config

### Tech

- Make help formatting easier to read in codebase
- Update dependencies

---

## 1.0.0

First release

### Feature

- Save quotes
- Get random quotes
- Display help
- Configure commands, feedbacks and more

### Documentation

- Create README & LICENSE

### Tech

- Ping to debug