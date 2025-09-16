let prefix = process.env.PREFIX;

module.exports = {
	name: "todo",
	description: "Things that are planned to be added in the future",
	usage: `${prefix}todo`,
  developer: false, 
	category: 'developer/debug', 

	execute(client, message, args, Discord) {
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#00')
			.setTitle('To Do')
			.addFields(
				{ name: 'update', value: '~slots will work in tandem with economy' }, 
				{ name: 'command', value: '~leaderboard for economy' }, 
				{ name: 'bug fix', value: '~work and ~daily timers are not properly set' }
				)
			.setTimestamp()

		//message.channel.send(exampleEmbed);
		message.channel.send({embeds: [exampleEmbed]}).catch(console.error)
	}
}
