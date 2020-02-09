const Telegraf = require('telegraf')
const axios = require('axios')
const watcher = require('./watcher')

//Send Telegram the API key for the bot
const bot = new Telegraf('APIKEY')

//Framework
var NodesWatched = [];

//Basic Commands
//Bot Start Message
bot.start((ctx) => {
    // startBackgroundCheck(ctx)
    ctx.reply('✌🏼Welcome, fellow Tracer✌🏼 \n I am merely a bot, so please dont abuse me. \n \nMy sole purpose in this life is to help you watch your nodes! This version is currently in alpha and functionality will be LIMITED for a indefinite period of time, meaning updates will only come as I have free time to contribute. I encourage those with development experience to contribute to the GitHub and help me develop features. Feel free to contact me or make a pull request to the Github repo. \n \nWith that being said, you probably want to add your node(s) using the /add command. \n \nUse the following syntax: \n\n/add ERC725 \n \nReplace ERC725 with the ERC725 address assigned to your node. \n \nExample: /add 0xb7695a0a431282a124fbd301b67625cc178ba57c  \n \nCommands: \n- /details: To get a detailed view of your nodes \n- /recentjobs: To check the recent jobs won within the last 7 days across ALL of your nodes \n- /odncheck: To view the stats or "health" of the ODN \n\nTo see the menu of the possible commands just send me /help')
})

//Bot Help Message
bot.help((ctx) => ctx.reply('These are the following commands: \n\n- /add: Add ERC725 identity to watchlist \n- /details: To get a detailed view of your nodes \n- /recentjobs: To check the recent jobs won within the last 7 days across ALL of your nodes \n- /odncheck: To view the stats or "health" of the ODN \n-Other commands are currently under development...'))


//Listen To These Commands
bot.on('sticker', (ctx) => ctx.reply('👍'))

//Add ERC725 to array command
bot.command('/add', (ctx) => {
    //Assign variable to user input
    var telegramString = ctx.message.text;

    //console.log(telegramString);

    var userERC725 = telegramString.replace('/add ', '');
    //console.log(userERC725);


    axios.get('https://othub-api.origin-trail.network/api/nodes/DataHolders/' + userERC725)
        .then(response => {
            //console.log(response.data);
            // console.log(response.data.Identity);
            NodesWatched.push(response.data.Identity);
            // console.log(NodesWatched);
            ctx.reply("You have sucessfully added node: " + response.data.Identity);
        })
        .catch(error => {
            console.log(error);
            ctx.reply('You did not enter a valid ERC725 Address. Please enter a valid one.');
        });


})

//View Nodes command
bot.command('/details', (ctx) => {
    //Reply the Amount of nodes 
    ctx.reply('Number of nodes saved: ' + NodesWatched.length);
    var i;
    var NodeNum = 1;
    for (i = 0; i < NodesWatched.length; i++){
    axios.get('https://othub-api.origin-trail.network/api/nodes/DataHolders/' + NodesWatched[i])
        .then(response => {
            
            // console.log(response.data);
            ctx.reply("💻Node - " + NodeNum++ + "\n\nIdentity: " + response.data.Identity + "\n\nTotal Won Offers: " + response.data.TotalWonOffers + "\nWon Offers(Last 7 days): " + response.data.WonOffersLast7Days + "\n\nStaked Tokens: " + (Math.round(response.data.StakeTokens * 100) / 100).toLocaleString() + "\nTokens Paid: " + (Math.round(response.data.PaidTokens * 100) / 100).toFixed(2) + "\nTokens locked in jobs: " + (Math.round(response.data.StakeReservedTokens * 100) / 100).toFixed(2) + "\n\nManagement Wallet: " + response.data.ManagementWallet);
        })
        .catch(error => {
            console.log(error);
        });

        //console.log(NodesWatched);

    }
});

//Recent Jobs command
bot.command('/recentjobs', (ctx) => {
    //Reply to the Amount of nodes added 
    ctx.reply('Jobs won across all nodes within the last 7 days:');
    var i;
    var JobNum = 0;
    
    for (i = 0; i < NodesWatched.length; i++){
    axios.get('https://othub-api.origin-trail.network/api/RecentActivity?identity=' + NodesWatched[i])
        .then(response => {
            
            for (i = 0; i < response.data.length; i++){
            // console.log(response.data);
            // console.log(Object.keys(response.data));
            ctx.reply("🎉Job - " + ++JobNum  + "🎉" + "\n\nToken Amount Per Holder: " + (Math.floor((response.data[i].TokenAmountPerHolder)*100)/100) + "\n\n Identity: " + response.data[i].Identity);
        }})
        .catch(error => {
            console.log(error);
        });
        //console.log(NodesWatched);
    }
});

//Recent Jobs command
bot.command('/odncheck', (ctx) => {
    //API Call
    axios.get('https://othub-api.origin-trail.network/api/Home')
        .then(response => {
            // console.log(response.data);
            ctx.reply('💻OriginTrail Decentralized Network Stats📈' + "\n\nOffers Info:" + "\n       Offers Total: " + response.data.OffersInfo.OffersTotal + "\n       Offers Active: " + response.data.OffersInfo.OffersActive + "\n       Offers (Last 7D): " + response.data.OffersInfo.OffersLast7Days + "\n       Offers (Last 24H): " + response.data.OffersInfo.OffersLast24Hours + "\n\nNodes Info:" + "\n       Nodes Online: " + response.data.NodesInfo.OnlineNodesCount + "\n       Nodes With Active Jobs: " + response.data.NodesInfo.NodesWithActiveJobs + "\n       Nodes With Jobs (Last 7D): " + response.data.NodesInfo.NodesWithJobsThisWeek + "\n       Nodes With Jobs (Last 1M): " + response.data.NodesInfo.NodesWithJobsThisMonth + "\n\n       Total Staked Tokens: " + Math.floor(response.data.NodesInfo.StakedTokensTotal).toLocaleString() + "\n       Locked Tokens: " + Math.floor(response.data.NodesInfo.LockedTokensTotal).toLocaleString() + "\n       Locked Tokens Ratio: " + ((response.data.NodesInfo.LockedTokensTotal/response.data.NodesInfo.StakedTokensTotal)*100).toLocaleString() + "%" + "\n\nLitigations Info:" + "\n       Litigations Total: " + response.data.LitigationsInfo.LitigationsTotal + "\n\n       Litigations (Last 7D): " + response.data.LitigationsInfo.Litigations7Days + "\n       Litigations Penalized (Last 7D): " + response.data.LitigationsInfo.Litigations7DaysPenalized + "\n       Litigations Not Penalized (Last 7D): " + response.data.LitigationsInfo.Litigations7DaysNotPenalized + "\n\n       Litigations (Last 1M): " + response.data.LitigationsInfo.Litigations1Month + "\n       Litigations Penalized (Last 1M): " + response.data.LitigationsInfo.Litigations1MonthPenalized + "\n       Litigations Not Penalized (Last 1M): " + response.data.LitigationsInfo.Litigations1MonthNotPenalized + "\n\n       Litigations (Last Hour): " + response.data.LitigationsInfo.LitigationsActiveLastHour);
        })
        .catch(error => {
            console.log(error);
        });
        //console.log(NodesWatched);
    }
);


//Launch bot
bot.launch()

console.log("bot running version 1.0.1 ...")

NodesWatched.push() //DEBUG
function onNewEntry(ctx) {
    return function(newOffers) {
        if (isNotEmpty(newOffers))
        ctx.reply("🎉You have a new offer!🎉" + JSON.stringify(newOffers, null, 4))
        // console.log("New offers were:" + JSON.stringify(newOffers, null, 4))
    }
}

const REFRESH_INTERVAL_SEC = 5
// Start thread to watch
//startBackgroundCheck()

function startBackgroundCheck(ctx) {
    function doBackgroundCheck() {
        watcher.runBackgroundCheck(NodesWatched, onNewEntry(ctx)).then(
            () => setTimeout(doBackgroundCheck, REFRESH_INTERVAL_SEC * 1000)
        )
    }
    doBackgroundCheck();
}

function isNotEmpty(newOffers){
    return !(Object.entries(newOffers).length === 0 && newOffers.constructor === Object)
}
