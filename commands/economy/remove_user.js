let prefix = process.env.PREFIX;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('econ_db.json');
const db = low(adapter);

module.exports = {
	name: "remove_user",
	description: "",
	usage: `${prefix}remove_user <user id>`,
	developer: true, 
	category: 'developer/debug', 

	execute(client, message, args, Discord) {
		if(args[0] == 'me'){
			args[0] = message.author.id;
		}

		/*
		DB.delete(args[0]).then(() => {
			message.reply('user removed from database');
			DB.get(args[0]).then(value => {
				console.log(value);
			});
		});
		*/
	}
}

