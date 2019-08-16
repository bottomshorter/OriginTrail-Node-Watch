const Telegraf = require('telegraf')
const axios = require('axios');

//Send Telegram the API key for the bot
const bot = new Telegraf('744332035:AAG3R8cmaa462Z0oy7ZpoPRYMuYCcFOckXI')

//Framework
var NodesWatched = [];

//Basic Commands
//Bot Start Message
bot.start((ctx) => ctx.reply('✌🏼Welcome, fellow Tracer✌🏼 \n I am merely a bot, so please dont abuse me. \n \nMy sole purpose in this life is to help you watch your nodes! I will allow you to subscribe for notifications regarding downtimes, node updates, low Ethereum balance, or payouts when your node(s) completes a job! \n \nWith that being said, you probably want to add your node(s) using the /add command. \n \nUse the following syntax: \n\n/add ERC725 \n \nReplace ERC725 with the ERC725 address assigned to your node. \n \nExample: /add 123.456.789.012 \n \nAfter that, you can send me some more commands to configure the notifications or check your node metrics.  \n \nExamples: \n- /nodedetails: To get a detailed view of your nodes \n- /tokenstatus: To check your staked tokens vs your locked tokens \n- /history: To show information about your payout history \n\nTo see the menu of the possible commands just send me /help \n \nMy creator, @bottomshorter, put a lot of time into this. Send him a tip as appreciation! ✌🏼 ☕️ & 🍔 ERC20 => 0x0d4C19fb34d4B8A45004E7A2a23B9d7283b32304'))

//Bot Help Message
bot.help((ctx) => ctx.reply('These are the following commands: \n\n- /add: Add ERC725 identity/desired nickname for node to watchlist \n- /detail: To get a detailed view of your nodes \n- /tokenstatus: To check your staked tokens vs your locked tokens \n- /history: To show information about your payout history'))


//Listen To These Commands
bot.on('sticker', (ctx) => ctx.reply('👍'))

//Add ERC725 to array command
bot.command('/add', (ctx) => {
    //Assign variable to user input
    var telegramString = ctx.message.text;

    //console.log(telegramString);

    var userERC725 = telegramString.replace('/add ', '');
    //console.log(userERC725);


    axios.get('https://api.othub.info/api/nodes/dataholders/' + userERC725)
        .then(response => {
            //console.log(response.data);
            console.log(response.data.Identity);
            NodesWatched.push(response.data.Identity);
            console.log(NodesWatched);
            ctx.reply("You have sucessfully added node: " + response.data.Identity);
        })
        .catch(error => {
            console.log(error);
            ctx.reply('You did not enter a valid ERC725 Address. Please enter a valid one.');
        });


})

//View Nodes command
bot.command('/nodedetails', (ctx) => {
    //Reply the Amount of nodes 
    ctx.reply('Number of nodes saved: ' + NodesWatched.length);
    var i;
    var NodeNum = 1;
    for (i = 0; i < NodesWatched.length; i++){
    axios.get('https://api.othub.info/api/nodes/dataholders/' + NodesWatched[i])
        .then(response => {
            
            // console.log(response.data);
            ctx.reply("Node - " + NodeNum++ + "\n\nIdentity: " + response.data.Identity + "\n\nTotal Won Offers: " + response.data.TotalWonOffers + "\nWon Offers(Last 7 days): " + response.data.WonOffersLast7Days + "\n\nStaked Tokens: " + response.data.StakeTokens + "\nTokens locked in jobs: " + response.data.StakeReservedTokens + "\n\nManagement Wallet: " + response.data.ManagementWallet);
        })
        .catch(error => {
            console.log(error);
        });

        //console.log(NodesWatched);

    }
});

//Launch bot
bot.launch()