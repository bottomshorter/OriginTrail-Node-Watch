Thank you for making your way onto my GitHub. After taking a web development class, I decided to take a stab at a little software. This is a side project I've been working on for OriginTrail Nodes. Please feel free to contribute and make a pull request for new features.

__THIS BOT IS HOSTED LOCALLY ON YOUR MACHINE__ 

## Pre-liminary Steps:
	-open Terminal/Command Prompt
	-execute the following: cd Desktop


1.) Clone the repo and navigate into the folder and to install dependencies type in cmd:
	
	git clone https://github.com/bottomshorter/OriginTrail-Node-Watch.git

	npm install	

2.) Go to Telegram, and talk start a new conversation with 'BotFather' via https://t.me/botfather

3.) Create a new bot by using the command /newbot

4.) Give it a username | ex.. "OriginTrailNodeWatch"

5.) Give the bot a "bot" name | ex.. OriginTrailNodeBot

6.) After your bot has been created, BotFather will send you a 'token' for access to the Telegram HTTP API.

	NOTE: DO NOT SHARE YOUR API KEY WITH ANYONE FOR SECURITY REASONS

7.) If you are using a code editor proceed to step 8a, if not and you are using command console, skip to step 8b.
8a.) Go into the cloned repo folder and edit line 6 of the index.js file and change APIKEY to the one generated by BotFather, leave the (' ')

Line 6 should look similar to this:

	const bot = new Telegraf('APIKEY') ---> const bot = new Telegraf('525312139:Blahblah462Z0oy7ZpoBLAHuYCcFBLAHBLAH')

8b.) Navigate into the cloned folder and do the following edit index.js with notepad:

Then find the line with: 
	
	const bot = new Telegraf('APIKEY')

Replace APIKEY with the one generated by BotFather and it will look similar to this:

	const bot = new Telegraf('525312139:Blahblah462Z0oy7ZpoBLAHuYCcFBLAHBLAH')



9.) Save the file and go into command console and type: npm start

10.) After your console says 'bot is running...'

11.) Start a conversation with your bot and type /start to begin using the bot to add your nodes

Side Notes: 

**-Since this is in alpha, you will have to keep your command console/terminal open during the use of your bot. Further versions will guide the user how to install and just run on your OTNODE.**


-If you would like to add your nodes into the NodesWatched array so you don't have to add them each time you start up the bot, just added your ERC725 Identities into the NodesWatched array with following syntax:

var NodesWatched = ['ERC725 ID #1', 'ERC725 ID #2' , 'ERC725 ID #X', '...']
