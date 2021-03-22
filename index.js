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
	const args = content.slice(process.env.botPrefix.length).trim().split(' ');

	if (!content.startsWith(process.env.botPrefix)) return;

	const command = commands[args[0].toLowerCase()];

	if (command) {
		args.shift();
		command(message, args, client);
	}
});

client.on('guildMemberAdd', (member) => {
	let userInfo;
	dataStore().then(async (data) => {
		userInfo = await data.banDataStore.GetAsync(member.id);
	}).then(() => {
		if (userInfo) member.ban({ reason: messages.globallyBanned });
	});
});

client.login(process.env.botToken);