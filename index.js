const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();


const mintents = [1, 2, 4, 8, 256, 512, 4096, 32768]

const client = new Discord.Client({partials: ["CHANNEL"], intents: 37445});
// Requires the essentials and creates client. Client is what the bot runs off of.

client.needs_update = [];
client.initialized = false;



console.log("                     -= BOT STARTING =-");
// Prettying up the console, not needed but makes it look nicer.

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
// Creates new collections to store commands and events.
// Lets the bot read the directories of commands and events.

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});
// Requires the handlers here, passes in client and Discord.

try {
    client.login(process.env.TOKEN);
}
catch {
    throw "Please define a token in the secrets tab of the editor!";
}
// this line turns on the bot, if no token is provided, it will error out

// Before using this template, please define the variables TOKEN and PREFIX in the secrets tab

// Spots in the code which are easily editable and won't completely break the code are marked as easy editable





const kally = new Discord.Client({partials: ["CHANNEL"], intents: 37445});
// Requires the essentials and creates client. Client is what the bot runs off of.

kally.needs_update = [];
kally.initialized = false;


console.log('')
console.log("                     -= KALLY BOT STARTING =-");
// Prettying up the console, not needed but makes it look nicer.

kally.commands = new Discord.Collection();
kally.events = new Discord.Collection();
// Creates new collections to store commands and events.
// Lets the bot read the directories of commands and events.

['command_handler', 'event_handler', 'database_handler'].forEach(handler => {
    require(`./kally_bot/handlers/${handler}`)(kally, Discord);
});
// Requires the handlers here, passes in client and Discord.

try {
    kally.login(process.env.K_TOKEN);
}
catch {
    throw "Please define a token in the secrets tab of the editor!";
}