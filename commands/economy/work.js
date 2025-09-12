let prefix = process.env.PREFIX;


const moment = require('moment');

let work_value = 100;

module.exports = {
	name: "work",
	description: "Work to gain money, available once every hour.",
	usage: `${prefix}work`,
	developer: false, 
	category: 'economy', 

	execute(client, message, args, Discord) {
		/*
		DB.get(`${message.author.id}`).then(user => {
			if(user == null){
				let command = client.commands.get('create_profile').execute(client, message, args, Discord);
			}else{
				let diffTime = Math.abs(moment() - user.last_work);
				let diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
				let diffHours = Math.round(diffTime / (1000 * 60 * 60));
				let diffMinutes = Math.round(diffTime / (1000 * 60));
				let diffSeconds = Math.round(diffTime / (1000));

				if (diffHours >= 1){
					give_work(message, Discord);
				}else{
					let exampleEmbed = new Discord.MessageEmbed()
									.setColor('#8ce7ff')
									.setDescription(`${message.author}, you are still tired from working!
Come back in ${60 - diffMinutes} minutes!`)
									.setTimestamp()

								//message.channel.send(exampleEmbed);
								message.reply({embeds: [exampleEmbed]}).catch(console.error);
				}
			}
		});
		*/
	}
}


function give_work(message, Discord){
	/*
	DB.get(`${message.author.id}`).then(user => {
		let diffTime = Math.abs(moment() - user.last_work);
		let diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
		let diffHours = Math.round(diffTime / (1000 * 60 * 60));
		let diffMinutes = Math.round(diffTime / (1000 * 60));
		let diffSeconds = Math.round(diffTime / (1000));

		let temp_user = user;
		temp_user.money += work_value;
		temp_user.last_work = new Date().getTime();

		DB.set(`${message.author.id}`, temp_user).then(() => {
			let exampleEmbed = new Discord.MessageEmbed()
				.setColor('#8ce7ff')
				.setDescription(`${message.author}, you worked to gain $${work_value}!
You now have $${temp_user.money}, come back in 1 hour to work again!`)
				.setTimestamp()

			//message.channel.send(exampleEmbed);
			message.reply({embeds: [exampleEmbed]}).catch(console.error);

		});
	});
	*/
}