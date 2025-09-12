let prefix = process.env.PREFIX;
let log_channel = process.env.MOD_LOG;

module.exports = {
	name: "ban",
	description: "",
	usage: `${prefix}ban <*@mention*> <*reason*>`,
	args: true, 
	mod: true, 
	category: 'mod/moderation', 

	execute(client, message, args, Discord) {
		let user_id = message.mentions.users.first().id;
		let user = message.guild.members.cache.get(user_id)
		let length = args[1];

		let channel = message.guild.channels.cache.get(log_channel);
		
		let reason = undefined;
		args.shift();
		args = args.join(' ');

		if(args.split('')[0] != undefined && args.split('')[0] != ' '){
			reason = args;
		}
		

		try{
			//message.reply(`${user} was banned for: ${reason}.`);
			let banned_at = new Date().addHours(-5);

			channel.send(`Offender: ${user}
Type: Ban
Reason: ${reason}
Issued: ${banned_at.getMonth()}/${banned_at.getDay()}`);

			user.ban({reason: reason});
		}catch(err){
			message.reply(`could not ban user '${user}/${user.id}' for some reason.`);
			console.log(err);
		}
	}
}




Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}