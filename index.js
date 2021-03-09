const Discord = require('discord.js');
const dataStore = require('./src/dataStore.js');
const config = require('./config.json');
const messages = require('./messages.json');

const client = new Discord.Client();

const commands = {
	globalban: require('./src/commands/globalban.js')
}

client.on('message', (message) => {
	if (message.author.bot) return;
  
	const content = message.content;
	const args = content.slice(config.botPrefix.length).trim().split(' ');

	if (!content.startsWith(config.botPrefix)) return;

	const command = commands[args[0].toLowerCase()];

	if (command) {
		args.shift();
		command(message, args, client);
	}
});

client.on('guildMemberAdd', async (member) => {
	const data = await dataStore.banDataStore.GetAsync(member.id);

	if (data) member.ban({ reason: messages.globallyBanned });
});

client.login(config.botToken);