const dotenv = require("dotenv");
dotenv.config();
const fs = require('fs');
// require the discord.js module
const Discord = require('discord.js');
//require the prefix
const { prefix} = require('./config.json');
//create a new Discord client
const client = new Discord.Client();

client.commands = new Discord.Collection();
//return an array of all the file names in the commands directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
// When the client is ready run this code
// This event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});



//send Pong when !ping is received
client.on('message', message =>{

	//If the message does not start with the prefix or it was sent by the bot exit
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	//slices of prefix and removes left over whitespaces and split into array by spaces
	const args = message.content.slice(prefix.length).trim().split(/ +/);

	//take the first element in array and return it while also removing it from the original args array
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);
	try
	{
		command.execute(message, args);

	}
	catch (error)
	{
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

//discord bots token for login.
client.login(process.env.TOKEN);