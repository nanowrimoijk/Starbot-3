let prefix = process.env.PREFIX;

module.exports = {
	name: "todo",
	description: "things that are planned to be added in the future",
	usage: `${prefix}todo`,
  developer: false, 
	category: 'developer/debug', 

	execute(client, message, args, Discord) {
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#00')
			.setTitle('To Do')
			.setAuthor('Help')//image is next argument
			.addField('update', '~slots will work in tandem with economy')
			.addField('command', '~leaderboard for economy')
			.addField('bug fix', '~work and ~daily timers are not properly set')
			.setTimestamp()

		//message.channel.send(exampleEmbed);
		message.channel.send({embeds: [exampleEmbed]}).catch(console.error)
	}
}
