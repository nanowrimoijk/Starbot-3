let prefix = process.env.PREFIX;

let mysql = require('mysql2');

let con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE
});


module.exports = {
	name: "eval",
	description: "Evaluates SQL in the economy database.",
	usage: `${prefix}eval <SQL>`,
	developer: true, 
	category: 'developer/debug', 

	execute(client, message, args, Discord) {
		let sql = args.join(' ');

		con.connect(function(err){
			if(err) throw err;

			con.query(sql, function(err, result){
				if(err){
					//message.reply(err);
					console.log(err)
				}
				if(result){
					//message.reply(result);
					console.log(result)
				}
			});
		});
	}
}
