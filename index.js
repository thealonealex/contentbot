require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
});

const fs = require("fs");
function getRandomLine(filename){
    const global_data = fs.readFileSync(filename).toString();
    const lines = global_data.split('\n');
    const line = lines[Math.floor(Math.random()*lines.length)]
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
    /article - Fetch a random saved article
    /video - Fetch a random save video
    /submit-article - Submit an article (must be of the type https://li.nk)
    /submit-video - Submit a video (must be of the type https://vi.deo)`
    })
});

app.command("/article", async({ack, respond}) => {
    await ack();
    const articleLink = getRandomLine('articles.txt');
    console.log(articleLink);
    await respond({text: articleLink});
});

app.command("/submit-article", async({body, ack, respond, }) =>{
    await ack();
    if (body.text.includes("https"))
    {
       fs.appendFile('articles.txt', `\n${body.text}`, function (err) {
        if (err) throw err;
        console.log('Saved a new article!');
    })
    await respond("Your article has been added to the list. Thanks :colon3:"); 
    } else {
        await respond("You did not submit a proper link! :angrycat:");
    }
    
});

app.command("/video", async({ack, respond}) => {
    await ack();
    const articleLink = getRandomLine('videos.txt');
    console.log(articleLink);
    await respond({text: articleLink});
});

app.command("/submit-video", async({body, ack, respond, }) =>{
    await ack();
    if (body.text.includes("https"))
    {
       fs.appendFile('videos.txt', `\n${body.text}`, function (err) {
        if (err) throw err;
        console.log('Saved a new video!');
    })
    await respond("Your video has been added to the list. Thanks :colon3:"); 
    } else {
        await respond("You did not submit a proper link! :angrycat:");
    }
    
});

(async() => {
    await app.start();
    console.log("bot is running!");
})();