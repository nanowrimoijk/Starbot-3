let prefix = process.env.PREFIX;

module.exports = {
	name: "cult-advice",
	description: "Provides advice for dealing with cults.",
	usage: `${prefix}cult-advice`,
	category: 'general/fun', 

	execute(client, message, args, Discord) {
		message.reply("JOIN THE HOBOPHOBIC CULT NOW!")
	}
}
