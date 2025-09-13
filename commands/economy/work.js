let prefix = process.env.PREFIX;

let mysql = require('mysql2');

let con = mysql.createConnection({
 	host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE
});


const moment = require('moment');

let work_value = 100;

module.exports = {
	name: "work",
	description: "Work to gain money, available once every hour.",
	usage: `${prefix}work`,
	developer: false, 
	category: 'economy', 

	execute(client, message, args, Discord) {

		con.connect(function(err){

			let sql = `SELECT * FROM users WHERE id = ${message.author.id}`;
			con.query(sql, function(err, result){
				if(err) throw err;

				if(result == undefined || result[0] == undefined){
					let command = client.commands.get('create_profile').execute(client, message, args, Discord);
				}else{
					let user = result[0];


					let diffTime = Math.abs(moment().valueOf() - moment(user.last_work).valueOf());
					console.log(diffTime)
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
		});


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

	let sql = `SELECT * FROM users WHERE id = ${message.author.id}`;
	con.query(sql, function(err, result){
		if(err) throw err;

		let user = result[0];

		let diffTime = Math.abs(moment().valueOf() - moment(user.last_work).valueOf());
		let diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
		let diffHours = Math.round(diffTime / (1000 * 60 * 60));
		let diffMinutes = Math.round(diffTime / (1000 * 60));
		let diffSeconds = Math.round(diffTime / (1000));

		let temp_user = user;
		temp_user.money = parseInt(temp_user.money);
		temp_user.money += work_value;
		temp_user.last_work = moment();

		sql = `UPDATE users SET money = ${temp_user.money}, last_daily = '${temp_user.last_daily}', daily_streak = ${temp_user.daily_streak}, last_work = '${temp_user.last_work}' WHERE id = ${message.author.id}`;
		con.query(sql, function(err, result){
			if(err) throw err;

			let exampleEmbed = new Discord.MessageEmbed()
				.setColor('#8ce7ff')
				.setDescription(`${message.author}, you worked to gain $${work_value}!
You now have $${temp_user.money}, come back in 1 hour to work again!`)
				.setTimestamp()

			//message.channel.send(exampleEmbed);
			message.reply({embeds: [exampleEmbed]}).catch(console.error);
		});
	});
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