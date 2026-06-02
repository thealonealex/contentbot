require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
});

const fs = require("fs");
function getRandomLine(filename){
    var global_data = fs.readFileSync("articles.txt").toString();
    var lines = global_data.split('\n');
    var line = lines[Math.floor(Math.random()*lines.length)]
    return line;
}


app.command("/cn-ping", async({ command, ack, respond }) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await respond({ text: `Pong!\nLatency: ${latency}ms`});
});

app.command("/cn-help", async({ ack, respond })=> {
    await ack();
    await respond({
        text:
`Available Commands:
    /cn-ping - Check bot latency
    /article - Fetch a random saved article`
    })
});

app.command("/article", async({ack, respond}) => {
    await ack();
    var articleLink = getRandomLine('articles.txt');
    console.log(articleLink);
    await respond({text: articleLink});
});

(async() => {
    await app.start();
    console.log("bot is running!");
})();