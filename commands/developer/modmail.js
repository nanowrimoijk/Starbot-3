const { Permissions } = require('discord.js');
const { MessageEmbed } = require('discord.js');
let prefix = process.env.PREFIX;

let mod_role = process.env.MOD_ROLE;

module.exports = {
	name: "modmail",
	description: "",
	usage: "",
	developer: true,

	execute(client, message, args, Discord) {
		let greeting = new MessageEmbed()
			.setColor('#00')
			.setTitle('Modmail')
			.setDescription(`Hello ${message.author.username}!\nUpon you sending another message, a channel will be opened for you to speak privately with the moderators of Stargaze City. If this was a mistake or you have decided otherwise, simply do nothing at all.`)
			.setAuthor(client.user.username)//image is next argument
			.setTimestamp()

		message.channel.send({ embeds: [greeting] }).catch(console.error);

		let filter = m => m.author.id === message.author.id
		message.channel.awaitMessages(filter, {
			max: 1,
			time: 10000,
			errors: ['time']
		}).then(reply => {
			reply = reply.first();

			let server = client.guilds.cache.get('583063339131863040');

			client.guilds.cache.get('583063339131863040').channels.create(`TK-${message.author.username}`, {
				type: 'GUILD_TEXT',
				permissionOverwrites: [
					{
						id: server.roles.everyone,
						deny: [Permissions.FLAGS.VIEW_CHANNEL],
					},
					{
						id: mod_role,//mod role id
						allow: [Permissions.FLAGS.VIEW_CHANNEL],
					},
					{
						id: message.author.id,//user id
						allow: [Permissions.FLAGS.VIEW_CHANNEL],
					},
				],
			}).then(channel => {
				channel.send(`<@&${mod_role}> <@&${message.author.id}> Ticket has been opened.`);
			});

			message.reply('Ticket has been created, please check Stargaze City for a special channel for you to use!');



		})
			.then(collected => {
				console.log(collected);
			})
			.catch(error => {
				message.channel.send('You have wasted my time, have a nice day.');
			});
	}
}