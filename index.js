const dotenv = require("dotenv");
dotenv.config();
// require the discord.js module
const Discord = require('discord.js');
//require the prefix
const { prefix} = require('./config.json');
//create a new Discord client
const client = new Discord.Client();

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
	const command = args.shift().toLowerCase();

	if (message.content === `${prefix}ping`) //ping command
	{
		message.channel.send('Pong.');
	}
	else if (message.content === `${prefix}beep`) //beep command
	{
		message.channel.send('Boop.');
	}
	else if (message.content === `${prefix}server`)//server info command
	{
		message.channel.send(`This server's name is:  ${message.guild.name} and there are currently : ${message.guild.memberCount} members in this server.`);
	}
	else if (command === 'args-info')
	{
		if(!args.length)
		{
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		else if (args[0] === `foo`)
		{
			return message.channel.send(`bar`);
		}
		//send a message with the command name and arguments
		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}
	else if(command === 'kick')// kick user command
	{
		//checks if there is no users tagged in the command and sends error message
		if(!message.mentions.users.size)
		{
			return message.reply(`You need to tag a user in order to kick them!!!`);
		}
		else
		{
			//grabs the user that was mentioned in the command
			const taggedUser = message.mentions.users.first();
			message.channel.send(`You wanted to kick: ${taggedUser.username}`);
		}
		
	}
	else if (command === 'avatar') //avatar command
	{
		if (!message.mentions.users.size)
		{
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true})}>`);
		}
		const avatarList = message.mentions.users.map(user =>{
			return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true})}>`;
		});
		// send the entire array of strings as a message
		message.channel.send(avatarList);
	}
});

//discord bots token for login.
client.login(process.env.TOKEN);