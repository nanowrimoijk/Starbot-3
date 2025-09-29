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
	name: "create_profile",
	description: "creates an economy profile for those who dont have one",
	usage: `${prefix}create_profile`,
	developer: true, 
	category: 'developer/debug', 

	async execute(client, message, args, Discord, callback) {

		let args1 = message.content.slice(prefix.length).split(/ +/g);
		let cmd = args1.shift().toLowerCase();

		let base_user = {
			money: 0, 
			last_daily: moment().hours(0).minutes(0).seconds(0).milliseconds(0), 
			daily_streak: 0, 
			last_work: moment().hours(0).minutes(0).seconds(0).milliseconds(0)
		}

		console.log(`user ${message.author.id} not found, creating profile`);
		/*
		DB.set(`${message.author.id}`, base_user).then(() => {
			console.log(base_user);
			client.commands.get(cmd).execute(client, message, args, Discord);
			return;
		});
		*/

		//db.set(`users.${message.author.id}`, base_user).write();


		con.getConnection(function(err, connection) {
		  if (err) throw err;
		  console.log("Connected!");

		  let sql;

		  // sql = "CREATE DATABASE economy";
		  // con.query(sql, function (err, result) {
		  //   if (err) throw err;
		  //   console.log("Table created");
		  // });

		  // sql = "CREATE TABLE users (id VARCHAR(255), money VARCHAR(255), last_daily VARCHAR(255), daily_streak VARCHAR(255), last_work VARCHAR(255))";
		  // con.query(sql, function (err, result) {
		  //   if (err) throw err;
		  //   console.log("Table created");
		  // });

		   sql = `INSERT INTO users (id, money, last_daily, daily_streak, last_work) VALUES (${message.author.id}, ${base_user.money}, '${base_user.last_daily}', ${base_user.daily_streak}, '${base_user.last_work}')`;
		   con.query(sql, function (err, result) {
		     if (err) throw err;
		     console.log("1 record inserted");

		    if(callback != undefined){
					client.commands.get(callback).execute(client, message, args, Discord);
				}
		   });


		  connection.release();
		});

		//message.reply('initalized your economy profile, please run that command again!');
	}
}
