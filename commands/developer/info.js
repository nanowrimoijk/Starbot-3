let prefix = process.env.PREFIX;

module.exports = {
	name: 'info',
	description: "admin information",
	usage: 	`${prefix}info`,
	category: 'developer/general', 
	developer: true, 

	execute(client, message, args, Discord) {
		message.channel.send('Finding ping...').then(resultMessage => {
			const ping = resultMessage.createdTimestamp - message.createdTimestamp;

			message.channel.send(`Bot Latency: ${ping}ms, API Latency: ${client.ws.ping}ms`);
		});
	},
};