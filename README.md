# Colorado Ranked Slippi Leaderboard

Code powering https://grantismo.github.io/CoSlippiLeaderboard/#/

## Technologies

- Typescript
- [Webpack@5](https://webpack.js.org/) as module bundler
- [Eslint](http://eslint.org/) for linting
- [Tailwind](https://tailwindcss.com/) for css


Fork of [reacts-pages-boilerplate](https://github.com/rtivital/react-pages-boilerplate)

## How it works

The leaderboard is built from two programs:
* [[src/](https://github.com/Grantismo/CoSlippiLeaderboard/tree/master/src)] A static react website which displays player data 
* [[cron/](https://github.com/Grantismo/CoSlippiLeaderboard/tree/master/cron)] A cron job which pulls connect codes from a google sheet, player data from slippi, and writes that data to json files in `cron/data/`, and then redeploys the static site.

## Caveats

* The undocumented slippi api this depends on may break at any time
* This project takes extra consideration to avoid slamming the slippi servers with api calls, please be considerate of this.
* Logic for determining ranks may become out of sync with the official slippi rank logic
* I'm missing svgs for Master ranks, lol

## Getting started

- Clone `git clone https://github.com/rtivital/react-pages-boilerplate` or [download](https://github.com/rtivital/react-pages-boilerplate/archive/master.zip) this repository.
- (Optional) Run `nvm use 18.12.0`. This will ensure that you are running the supported version of Node.js. You can nvm installation instructions [here](https://github.com/creationix/nvm).
- Install dependencies: `yarn`
- Run the project: `npm start`
- Set your repoPath in settings.js and  "homepage" in package.json to your github pages url (e.g. https://grantismo.github.io/CoSlippiLeaderboard/)
- Create a google form to collect player tags from your region. ![image](https://user-images.githubusercontent.com/911232/207989907-256100e3-c215-4699-9ae7-655d5345cbd4.png)
- Link your google form to a google sheet ![image](https://user-images.githubusercontent.com/911232/207990065-aadc0a30-2561-46b7-a46e-0742af601cec.png)
- Follow directions in https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account to create a service account and credentials to read from the google sheet. Save your creds json file to `secrets/creds.json`
- Change `spreadsheetID` in settings.js to your google sheet ID
- Edit your crontab to run the cron job every 30 minutes. On linux `crontab -e`

Example crontab:
```
# m h  dom mon dow   command
*/30 * * * * /bin/bash /home/grantismo/code/CoSlippiLeaderboard/cron/run.sh
```

## Settings

[settings.js](./settings.js) file includes all important settings that should be used to setup deployments to gh-pages:

- **title** – Base application title
- **cname** – Adds CNAME file that allows to use custom domain names with gh-pages
- **repoPath** – username.github.io/repoPath for react router to recognize gh-pages paths
- **spreadsheetID** - ID for google sheet containing player connect codes. `https://docs.google.com/spreadsheets/d/[YOUR ID]`

## scripts

- `npm start` – starts development server with webpack-dev-server
- `npm run build` – builds project to production
- `npm run deploy` – builds and deploys project to Github pages
- `./cron/run.sh` - manually runs the cron job

## Support me
☕ [buy me a coffee](https://www.buymeacoffee.com/blorppppp)
