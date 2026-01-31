const fs = require('fs');


module.exports = (client, Discord) => {
	client.db = {
		cards: {}, 
		RE: {}
	}


	const load_dir = (dirs) => {
		const command_files = fs.readdirSync(`./kally_bot/${dirs}`);

		for (const file of command_files) {
			const data = require(`../${dirs}/${file}`);
			eval(`client.db.${dirs}.${file.split('.')[0]} = data`);
			//data = `client.db.${dirs}.${file.split('.')[0]}`;
		}
	}

	['cards', 'RE'].forEach(e => load_dir(e));


	//console.log(client.db)


}
