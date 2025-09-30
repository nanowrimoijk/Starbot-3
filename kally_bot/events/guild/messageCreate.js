const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');

let mod_role = process.env.MOD_ROLE;
let dev_log_channel = process.env.DEV_LOG_CHANNEL;
let dev_log_server = process.env.DEV_LOG_SERVER;

let modmail_cache = [];
let modmail_current = [];

module.exports = (Discord, client, message) => {

	if (!message.author.bot && message.guild != null) {

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

}


function Random(max) {
	return Math.floor(Math.random() * Math.floor(max));
}