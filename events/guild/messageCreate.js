const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');

let mod_role = process.env.MOD_ROLE;
let dev_log_channel = process.env.DEV_LOG_CHANNEL;
let dev_log_server = process.env.DEV_LOG_SERVER;

let modmail_cache = [];
let modmail_current = [];

module.exports = (Discord, client, message) => {

	if (!message.author.bot && message.guild != null) {

		if (message.author.id == '710851827066732555' || message.author.id == process.env.DEVELOPER) {
			if (message.mentions.users.has(client.user.id) && message.content.includes('girlfriend')) {
				message.channel.send('<@710851827066732555> my beloved');//710851827066732555
			}
		}

		if(message.member._roles.includes(process.env.MOD_ROLE) && message.content.toLowerCase().includes(`${process.env.PREFIX}tkclose`)){
			let channel_name = message.channel.name.split('-');
			if(channel_name[0] == 'tk'){
				message.channel.delete();
				let new_cache = modmail_cache.filter(function (f) {
					return f !== channel_name[1];
				});
				modmail_cache = new_cache;
				
				let new_current = modmail_current.filter(function (f) {
					return f !== channel_name[1];
				});
				modmail_current = new_current;
				console.log(modmail_cache, modmail_current);
			}
		}

		let prefix = process.env.PREFIX;
		//console.log(prefix)
		if ((!message.content.startsWith(prefix) && message.guild != null) || message.author.bot) return;

		const args = message.content.slice(prefix.length).split(/ +/g);
		let cmd = args.shift().toLowerCase();
		//console.log(cmd)


		const command = client.commands.get(cmd);
		//console.log(command);
		if (!command) return;

		if (message.guild != null) {
			if ((command.developer && message.author.id != process.env.DEVELOPER)) {
				//let mod_role = message.guild.roles.cache.find((r) => r.name === "Starcop (Mod)");
				return message.reply(`You don't have permission to use this command!`);
			}

			if (command.admin && !message.member._roles.includes(process.env.ADMIN_ROLE) && message.author.id != process.env.DEVELOPER) {
				return message.reply(`You don't have permission to use this command!`);
			}

			if (command.mod && !message.member._roles.includes(process.env.MOD_ROLE) && !message.member._roles.includes(process.env.ADMIN_ROLE) && message.author.id != process.env.DEVELOPER) {
				return message.reply(`You don't have permission to use this command!`);
			}
		}

		if (command.args && !args.length) {
			return message.reply(`You didn't provide any arguments!`);
		}

		try {
			command.execute(client, message, args, Discord);
		} catch (error) {
			console.log(error);
			message.reply('there was an error trying to execute that command!');
		}
	}

	if (!message.author.bot && message.guild == null) {
		if (modmail_cache.includes(message.author.id) && message.content.toLowerCase() != 'cancel' && !modmail_current.includes(message.author.id)) {
			modmail_current.push(message.author.id);
			console.log(modmail_cache);

			let server = client.guilds.cache.get('583063339131863040');
			client.guilds.cache.get('583063339131863040').channels.create(`TK-${message.author.id}`, {
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
				//channel.send(` <@${message.author.id}> Ticket has been opened.`);
				channel.send(`<@&${mod_role}> <@${message.author.id}> Ticket has been opened.`);
				message.reply(`Ticket has been created --> <#${channel.id}>`);
			});

			//message.reply('Ticket has been created, please check Stargaze City for a special channel for you to use!');
		}
		else if(!modmail_cache.includes(message.author.id) && message.content.toLowerCase() != 'cancel' && !modmail_current.includes(message.author.id)){
			
			modmail_cache.push(message.author.id);
			let greeting = new MessageEmbed()
				.setColor('#00')
				.setTitle('Modmail')
				.setDescription(`Hello ${message.author.username}!\nUpon you sending another message, a channel will be opened for you to speak privately with the moderators of Stargaze City. If this was a mistake or you have decided otherwise, simply say 'cancel'.`)
				.setAuthor(client.user.username)//image is next argument
				.setTimestamp()

			message.channel.send({ embeds: [greeting] }).catch(console.error);
		}
		else if(modmail_cache.includes(message.author.id) && message.content.toLowerCase() == 'cancel'){
			let new_cache = modmail_cache.filter(function (f) {
					return f !== message.author.id;
			});
			modmail_cache = new_cache;
			message.channel.send('You have wasted my time, have a nice day.');
		}
		else{
			client.guilds.cache.get(dev_log_server).channels.cache.get(dev_log_channel).send(`<@${process.env.DEVELOPER}> user: ${message.author.username}, id:${message.author.id} has tried to open a ticket but already has one open.`);
			message.channel.send(`You already have a ticket open! If you think this is a mistake, please message the developer at @luavanderly or, you can just wait as the developer has already been notified of this incident :)`)
		}
	}

}


function Random(max) {
	return Math.floor(Math.random() * Math.floor(max));
}