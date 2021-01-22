module.exports = {
	name: 'kick',
	description: 'Kick!',
	execute(message, args) {
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
	},
};