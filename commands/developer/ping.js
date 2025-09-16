let prefix = process.env.PREFIX;
let moment = require('moment');

let mysql = require('mysql2');

let con = mysql.createConnection({
 	host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE
});



module.exports = {
	name: 'ping',
	description: "Returns the bot\'s ping.",
	usage: 	`${prefix}ping`,
	category: 'developer/general', 
	developer: true, 
	
	execute(client, message, args, Discord) {

		// con.connect(function(err){
		// 	if (err) throw err;

		// 	let sql = `UPDATE users SET last_daily = '${moment().hours(0).minutes(0).seconds(0).milliseconds(0)}'`;
		//   con.query(sql, function (err, result) {
		//     if (err) throw err;
		//     console.log(result.affectedRows + " record(s) updated");
		//   });
		// });


		message.channel.send('Finding ping...').then(resultMessage => {
			const ping = resultMessage.createdTimestamp - message.createdTimestamp;

			message.channel.send(`Bot Latency: ${ping}ms, API Latency: ${client.ws.ping}ms`);
		});
	},
};

// Ping command, displays Bot Latency and API Latency.
// Personally I put console.logs in here to test universal values like message.member and see what they return