let prefix = process.env.PREFIX;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('econ_db.json');
const db = low(adapter);

db.defaults({ users: {} }).write();


const moment = require('moment');

module.exports = {
	name: "create_profile",
	description: "creates an economy profile for those who dont have one",
	usage: `${prefix}create_profile`,
	developer: true, 
	category: 'developer/debug', 

	async execute(client, message, args, Discord) {

		let args1 = message.content.slice(prefix.length).split(/ +/g);
		let cmd = args1.shift().toLowerCase();

		let base_user = {
			money: 0, 
			last_daily: Math.round(new Date / (1000 * 60 * 60 * 24)), 
			daily_streak: 0, 
			last_work: Math.round(new Date / (1000 * 60 * 60 * 24))
		}

		console.log(`user ${message.author.id} not found, creating profile`);
		/*
		DB.set(`${message.author.id}`, base_user).then(() => {
			console.log(base_user);
			client.commands.get(cmd).execute(client, message, args, Discord);
			return;
		});
		*/

		await db.set(`users.${message.author.id}`, base_user).write();
	}
}
