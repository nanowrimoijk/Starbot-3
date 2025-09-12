let prefix = process.env.PREFIX;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('econ_db.json');
const db = low(adapter);

const moment = require('moment');

module.exports = {
	name: "profile",
	description: "Displays the profile of a user.",
	usage: `${prefix}profile`,
	developer: false, 
	category: 'economy', 

	execute(client, message, args, Discord) {
		/*
		DB.get(`${message.author.id}`).then(user => {

			if(user == null){
				let command = client.commands.get('create_profile').execute(client, message, args, Discord);
			}else{
				let profile_embed = new Discord.MessageEmbed()
					.setColor('#8ce7ff')
					.setTitle(`${message.author.username}'s profile`)
					.setDescription(`${message.author} you have $${user.money}`)
					.addField(`login streak: ${user.daily_streak}`, `last daily taken ${moment(user.last_daily).fromNow()}`)
					.setTimestamp()


				message.channel.send({embeds: [profile_embed]}).catch(console.error);
			}
		});
		*/
	}
}
