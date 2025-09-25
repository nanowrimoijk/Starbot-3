let prefix = process.env.PREFIX;

let mysql = require('mysql2');

let con = mysql.createPool({
 	host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE
});


const moment = require('moment');

module.exports = {
	name: "profile",
	description: "Displays the profile of a user.",
	usage: `${prefix}profile`,
	developer: false, 
	category: 'economy', 

	execute(client, message, args, Discord) {

		con.getConnection(function(err, connection){
			let sql = `SELECT * FROM users WHERE id = ${message.author.id}`;
			con.query(sql, function(err, result){

				if(result == undefined || result[0] == undefined){
					client.commands.get('create_profile').execute(client, message, args, Discord, 'profile');
				}else{
					let user = result[0];
					let daily_text = moment(user.last_daily).fromNow();

					if(moment().valueOf() >= moment(user.last_daily)){
						daily_text = 'right now!'
					}

					
					let profile_embed = new Discord.MessageEmbed()
						.setColor('#8ce7ff')
						.setTitle(`${message.author.username}'s profile`)
						.setDescription(`${message.author} you have $${user.money}`)
						.addFields(
							{ name: `login streak: ${user.daily_streak}`, value: `Next daily ${daily_text}` }//need to fix thissssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
							)
						.setTimestamp()


					message.channel.send({embeds: [profile_embed]}).catch(console.error);

					console.log()
				}
			});

			connection.release();
		});
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
