let prefix = process.env.PREFIX;


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

