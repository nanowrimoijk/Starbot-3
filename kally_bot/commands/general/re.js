let prefix = process.env.K_PREFIX;

let fs = require('fs');

module.exports = {
	name: "re",
	description: "Display information for a specified rouge expedition skill or boss card.",
	usage: `${prefix}re <card_name>`,
  developer: false, 
	category: 'developer/debug', 
	args: true, 

	execute(client, message, args, Discord) {

		let db = Object.keys(client.db.RE);
		let query = args[0].toLowerCase();
		let lettered = query.split('');

		//console.log(db.includes(query))

		if(db.includes(query) || db.includes( query.split("'").join('') )){
			display_card(message, Discord, eval(`client.db.RE.${ query.split("'").join('') }`));
		}else{
			let current_step = db;
			let previous_step = [];
			//let cdc = client.db.cards;

			for(let l = 0; l <= lettered.length - 1; l++){
				previous_step = current_step;
				current_step = [];

				for(let d = previous_step.length - 1; d >= 0; d--){

					if(previous_step[d].split('')[l] == lettered[l]){
						current_step.push(previous_step[d]);
					}
				}

				console.log(current_step);

				if(current_step.length == 1){
					break;
				}
			}

			if(current_step[0] != undefined){
				display_card(message, Discord, eval(`client.db.RE.${ current_step[0].split("'").join('') }`));
			}else{
				message.reply(`no card could be found for '${args[0]}'`);
			}
		}


	}
}


function find_image(query){
	let search = query.split("'").join('').split(' ').join('_')
	//console.log(`avatar-${query.toLowerCase()}.png`)
	//console.log('')

	const image_files = fs.readdirSync(`./kally_bot/commands/general/images`);

	for (const image of image_files) {
		//console.log(image.toLowerCase());

		if(image.toLowerCase() == `skill-${search.toLowerCase()}.png`){
			console.log(image)
			return image;
		}

		//const data = require(`./images/${image}`);
		//eval(`client.db.${dirs}.${image.split('.')[0]} = data`);
	}

}



function display_card(message, Discord, card){
	let image = find_image(card.name);

	let color;

	switch(card.faction){//'#F5D627'
		case 'Skill':
			color = '#F5D627';
			break;
		case 'Titanide':
			color = '#2EBAE8';
			break;
		case 'Echorus':
			color = '#2EE85F';
			break;
		case 'Mabot':
			color = '#E82E2E';
			break;
		case "Vel'Dhar":
			color = '#00'
			break;
	}

	//console.log(card)

	if(card.cost == ''){
		card.cost = 'N/A';
	}

	let exampleEmbed;

	if(card.faction != 'Skill'){
		exampleEmbed = new Discord.MessageEmbed()
			.setColor(color)
			.setTitle(card.name)
			.addFields(
		    { name: "Faction", value: `${card.faction}`, inline: true },
		    { name: "Base Power", value: `${card.power}`, inline: true },
		    { name: "Cost", value: `${card.cost}`, inline: true }
		  )
		  .addFields(
		  	{ name: "_ _", value: card.text, inline: false }
		  )
			.setThumbnail(`attachment://image.png`)
			//.setDescription(card.text)
			.setTimestamp()
	}

	if(card.faction == 'Skill'){
		exampleEmbed = new Discord.MessageEmbed()
			.setColor(color)
			.setTitle(card.name)
			.addFields(
		    { name: "Skill", value: `_ _`, inline: true }
		  )
		  .addFields(
		  	{ name: "_ _", value: card.text, inline: false }
		  )
			.setThumbnail(`attachment://image.png`)
			//.setDescription(card.text)
			.setTimestamp()
	}

	let object = {embeds: [exampleEmbed], files: []}

	if(image != undefined){
		let attachment = new Discord.MessageAttachment(`./kally_bot/commands/general/images/${image}`, 'image.png');
		object.files.push(attachment);
	}

	//message.channel.send(exampleEmbed);
	message.reply(object).catch(console.error)
}