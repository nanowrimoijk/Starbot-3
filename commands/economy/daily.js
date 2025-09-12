let prefix = process.env.PREFIX;


const moment = require('moment');

let daily_value = 100;
let streak_bonus = 10;

module.exports = {
	name: "daily",
	description: "Collect your daily funds.",
	usage: `${prefix}daily`,
	developer: false, 
	category: 'economy', 

	execute(client, message, args, Discord) {
		try{
			//let user = db.get(`users.${message.author.id}`).value();
			console.log(user);
			//let thing = db.get('users').value();
			console.log(thing)

			if(user == undefined){
				client.commands.get('create_profile').execute(client, message, args, Discord);
			}
			else{
				let diffTime = Math.abs(moment() - user.last_daily);
				let diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
				let diffHours = Math.round(diffTime / (1000 * 60 * 60));
				let diffMinutes = Math.round(diffTime / (1000 * 60));
				let diffSeconds = Math.round(diffTime / (1000));

				if(diffDays >= 1){
					let temp_user = user;

					if(diffDays > 1){
						temp_user.daily_streak = 0;
					}else{
						temp_user.daily_streak += 1;
					}
					give_daily(message, temp_user, Discord);
				}else{
					//console.log(moment(user.last_daily).calendar());
					//console.log(moment().calendar());
					//console.log(moment().hours());
					let exampleEmbed = new Discord.MessageEmbed()
						.setColor('#8ce7ff')
						.setDescription(`${message.author}, you have already claimed your daily reward!
			Come back in ${24 - diffHours} hours to claim it again!`)
						.setTimestamp()

						message.reply({embeds: [exampleEmbed]}).catch(console.error);
				}
			}
			
			/*
			DB.get(`${message.author.id}`).then(user => {

				if(user == null){
					let command = client.commands.get('create_profile').execute(client, message, args, Discord);
				}
				else{
					let diffTime = Math.abs(moment() - user.last_daily);
					let diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
					let diffHours = Math.round(diffTime / (1000 * 60 * 60));
					let diffMinutes = Math.round(diffTime / (1000 * 60));
					let diffSeconds = Math.round(diffTime / (1000));

					if(diffDays >= 1){
						let temp_user = user;

						if(diffDays > 1){
							temp_user.daily_streak = 0;
						}else{
							temp_user.daily_streak += 1;
						}
						give_daily(message, temp_user, Discord);
					}else{
						//console.log(moment(user.last_daily).calendar());
						//console.log(moment().calendar());
						//console.log(moment().hours());
						let exampleEmbed = new Discord.MessageEmbed()
							.setColor('#8ce7ff')
							.setDescription(`${message.author}, you have already claimed your daily reward!
Come back in ${24 - diffHours} hours to claim it again!`)
							.setTimestamp()

							message.reply({embeds: [exampleEmbed]}).catch(console.error);
					}
				}
			});
			*/
		}catch{}
	}
}



function give_daily(message, temp_user, Discord){
		//console.log()
		//console.log(user)
		//console.log()

		let diffTime = Math.abs(moment() - temp_user.last_daily);
		let diffDays = Math.round(diffTime / (1000 * 60 * 24));
		let diffHours = Math.round(diffTime / (1000 * 60));
		let diffMinutes = Math.round(diffTime / (1000));
		let lastDaily = moment(temp_user.last_daily);
		let nextDaily = moment(temp_user.last_daily).add(24, 'hour');

		//console.log(lastDaily.calendar());
		//console.log(nextDaily.calendar());
		//console.log(nextDaily.fromNow());
		//console.log(diffMinutes);

		temp_user.money += daily_value;
		temp_user.money += streak_bonus * temp_user.daily_streak;
		temp_user.last_daily = new Date().getTime();

		//db.set(`users.${message.author.id}`, temp_user).write();

		let exampleEmbed = new Discord.MessageEmbed()
						.setColor('#8ce7ff')
						.setDescription(`${message.author}, you have claimed ${temp_user.daily_streak} days in a row!
		You claimed $${daily_value + (streak_bonus * temp_user.daily_streak)}! Come back tomorrow to keep your streak!`)
						.setTimestamp()

		//message.channel.send(exampleEmbed);
		message.channel.send({embeds: [exampleEmbed]}).catch(console.error);

		/*
		DB.set(`${message.author.id}`, temp_user).then(() => {
			let exampleEmbed = new Discord.MessageEmbed()
				.setColor('#8ce7ff')
				.setDescription(`${message.author}, you have claimed ${temp_user.daily_streak} days in a row!
You claimed $${daily_value + (streak_bonus * temp_user.daily_streak)}! Come back tomorrow to keep your streak!`)
				.setTimestamp()

			//message.channel.send(exampleEmbed);
			message.channel.send({embeds: [exampleEmbed]}).catch(console.error);
		});
	*/
}
