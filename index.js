const dotenv = require("dotenv");
dotenv.config();
// require the discord.js module
const Discord = require('discord.js');

const config = require('./config.json');
//create a new Discord client
const client = new Discord.Client();

// When the client is ready run this code
// This event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message =>{
	if(message.content === '!ping')
	{
		message.channel.send('Pong');
	}
});

//discord bots token for login.
client.login(process.env.TOKEN);