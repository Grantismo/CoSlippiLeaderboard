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
* [[cron/](https://github.com/Grantismo/CoSlippiLeaderboard/tree/master/cron)] A cron job which pulls connect codes from a google sheet, player data from slippi, and writes that data to json files in `cron/data/`, and then redeploys the static site (and automatically configures github pages for you on the first deploy).

## Caveats

* The undocumented slippi api this depends on may break at any time
* This project takes extra consideration to avoid slamming the slippi servers with api calls, please be considerate of this.
* Logic for determining ranks may become out of sync with the official slippi rank logic
* I would appreciate if you keep my 'by me a coffee' link and give me credit for building this in your leaderboard.

## Getting started

- Easiest to get working on a unix system (linux/mac). On windows you can use WSL to install ubuntu. https://learn.microsoft.com/en-us/windows/wsl/install 
- Clone this repository: `git clone https://github.com/Grantismo/CoSlippiLeaderboard.git` 
- (Optional) Install NVM -- instructions [here](https://github.com/creationix/nvm)
- (Optional) Run `nvm use 18.12.0`. This will ensure that you are running the supported version of Node.js.
- Install yarn `npm install --global yarn`
- Install dependencies: `yarn` (from your code directory).
- (Optional) Install the github cli tool -- instructions here https://github.com/cli/cli#installation
- (Optional) Run `gh auth login`
- Set your repoPath in settings.js and  "homepage" in package.json to your github pages url (e.g. https://grantismo.github.io/CoSlippiLeaderboard/)

### If you want to collect connect codes from a google form
- Create a google form to collect player tags from your region. ![image](https://user-images.githubusercontent.com/911232/207989907-256100e3-c215-4699-9ae7-655d5345cbd4.png)
- Link your google form to a google sheet ![image](https://user-images.githubusercontent.com/911232/207990065-aadc0a30-2561-46b7-a46e-0742af601cec.png)
- Follow directions in https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account to create a service account and credentials to read from the google sheet. Save your creds json file to `secrets/creds.json`
- Change `spreadsheetID` in settings.js to your google sheet ID

### If you want to manually populate your list of connect codes:
- Modify `getPlayerConnectCodes` to supply the list directly (see https://github.com/costasford/NorcalSlippiLeaderboard/blob/master/cron/fetchStats.ts#L11-L13)
- Delete `import { GoogleSpreadsheet } from 'google-spreadsheet';` and `import creds from '../secrets/creds.json';` from `cron/fetchStats.ts`

### Test your cronjob
- Create dummy initial data 
```
mkdir cron/data
echo '[]' >> cron/data/players-new.json
mkdir cron/logs
touch cron/logs/log.txt
```
- Run the job `./cron/run.sh`
- A successful job should look like this: 

![image](https://user-images.githubusercontent.com/911232/209762179-e3da2be2-48d4-4c2a-a40c-c5fb3f78a8e9.png)

- A log file should be written at cron/logs/log.txt. You can watch the output as the cron runs with `tail -f cron/logs/log.txt`

### Test the web app
- Run `npm start` and open http://localhost:8262/ in your browse.

### Final steps
- Commit any remaining changes 
- `git add .`
- `git commit -m "Describe your commit here"`
-  Edit your crontab to run the cronjob on a reoccuring basis (every hour for example). On linux `crontab -e`:

```
# m h  dom mon dow   command
0 * * * * /full/path/to/your/code/CoSlippiLeaderboard/cron/run.sh
```
- You can look in cron/logs/log.txt to see the output of the latest cron run.
- That's it!
- DM me on discord if you run into problems. blorppppp#2398

### Common issues:
- The cron server isn't started. `sudo service cron status`
  - On Windows WSL: https://www.howtogeek.com/746532/how-to-launch-cron-automatically-in-wsl-on-windows-10-and-11/
- `/bin/sh: 1: npm: not found`, npm is not in the path when running the cron job.
  - Add your PATH manually to `cron/run.sh`. See https://stackoverflow.com/a/14612507
- Your deployed site looks like this README. Your github pages configuration needs updating.
  - Correct github page settings should look like this:
  ![image](https://user-images.githubusercontent.com/911232/210273059-7a47d009-71d0-4dec-aea2-b93e115c86fd.png)


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
