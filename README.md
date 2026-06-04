# Connie the contentbot
A Slack bot that picks random articles and videos from a list of submitted links by the users.

![connie replying to the command /article with an article link](<screenshot.png>)
## How does this work
Connie saves submitted links in a txt links, and fetches a random line for the file when a user requests
## Commands
- `/cn-ping` checks the server's respond speed
- `/cn-help` lists all commands
- `/article` fetches a random article
- `/video` fetches a random video
- `/submit-article https://yourl.ink` submits an article to the list
- `/submit-video https://yourvi.deo` submits a video to the list
## Developing
- Requires nodejs and npm installed
- Requires @slack/bolt and dotenv libraries, run `npm install @slack/bolt dotenv`
- You need to create an emtpy articles.txt and videos.txt file inside the project folder
- You need a .env file that looks like this:
```
SLACK_BOT_TOKEN=yourbottoken
SLACK_APP_TOKEN=yourapptoken
```