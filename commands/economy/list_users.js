let prefix = process.env.PREFIX;


module.exports = {
	name: "list_users",
	description: "Lists the ids of all recorded users.",
	usage: `${prefix}list_users`,
	developer: true, 
	category: 'developer/debug', 

	execute(client, message, args, Discord) {
		/*
		DB.list().then(keys => {
			console.log(keys)
		});
		*/
	}
}
