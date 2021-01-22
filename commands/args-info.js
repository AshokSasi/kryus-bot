module.exports = {
	name: 'args-info',
	description: 'Args-info!',
	args: true,
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}
		//send a message with the command name and arguments
		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	},
};