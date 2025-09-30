let prefix = process.env.K_PREFIX;

module.exports = {
	name: "embed",
	description: "",
	usage: "",
  developer: true, 
	category: 'developer/debug', 

	execute(client, message, args, Discord) {
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#00')
			.setTitle('Commands')
			.addField('search <tag>', 'Search the database for items tagged with <tag>')
			.setTimestamp()

		//message.channel.send(exampleEmbed);
		message.channel.send({embeds: [exampleEmbed]}).catch(console.error)
	}
}
