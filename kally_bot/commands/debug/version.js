let prefix = process.env.K_PREFIX;

module.exports = {
	name: 'v',
	description: "Returns the CSA version the bot is updated to.",
	usage: 	`${prefix}v`,
	category: 'developer/general', 
	developer: true, 
	
	execute(client, message, args, Discord) {

		message.channel.send('v2.66')
	},
};

// Ping command, displays Bot Latency and API Latency.
// Personally I put console.logs in here to test universal values like message.member and see what they return