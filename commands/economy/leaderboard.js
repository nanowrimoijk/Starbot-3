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
	name: "leaderboard",
	alias: ['leaders'], 
	description: "Displays all users ranked by how much money they have.",
	usage: `${prefix}leaderboard`,
	developer: true, 
	category: 'developer/debug', 

	async execute(client, message, args, Discord, callback) {

		
	}
}
