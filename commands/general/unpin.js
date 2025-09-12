let prefix = process.env.PREFIX;

module.exports = {
	name: "unpin",
	description: "Usable by forum owners only, unpins a message.",
	usage: `${prefix}pin`,
	developer: false, 
	category: 'general/general', 

	execute(client, message, args, Discord) {
		if(message.author.id == message.channel.ownerId){
			if(message.reference != undefined){
				message.channel.messages.fetch(message.reference.messageId)
				.then(option => option.unpin())
				.catch(console.error);
				message.react("✅")
				.then(console.log)
				.catch(console.error);
			}else{
				message.reply("You must reply to a message to use this command!");
			}
		}else{
			message.reply("You must own the current channel in order to use this command!");
		}
	}
}
