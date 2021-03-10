const dataStore = require('./src/dataStore.js');
const config = require('./config.json');
const messages = require('./messages.json');
const Discord = require('discord.js');

const client = new Discord.Client();

const commands = {
	globalban: require('./src/commands/globalban.js'),
	globalunban: require('./src/commands/globalunban.js')
}

client.on('message', (message) => {
	if (message.author.bot) return;

	const content = message.content;
	const args = content.slice(config.botPrefix.length).trim().split(' ');  // procesar mensaje separándolo por espacios

	if (!content.startsWith(config.botPrefix)) return;

	const command = commands[args[0].toLowerCase()]; // para que se pueda utilizar el comando con o sin mayúsculas

	if (command) {
		args.shift();
		command(message, args, client);
	}
});

client.on('guildMemberAdd', (member) => {
	// aquí vamos a chequear si el usuario ya está en la base de datos para darle banamex
	let userInfo;
	dataStore().then(async (data) => {
		userInfo = await data.banDataStore.GetAsync(member.id);
	}).then(() => {
		if (userInfo) member.ban({ reason: messages.globallyBanned });
	});
});

client.login(config.botToken);