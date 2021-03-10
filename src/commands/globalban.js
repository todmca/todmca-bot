const dataStore = require('../dataStore.js');
const messages = require('../../messages.json');

module.exports = async function(message, args, client) {
	const { member, mentions } = message;

	if (!member.hasPermission('BAN_MEMBERS')) {
		message.channel.send(`<@${member.id}>, ${messages.insufficientPermissions}`)
		return;
	}

	args.shift();
	
	let target = mentions.users.first();

	if (target) {
		const info = { reason: args.reduce((current, total) => current + ' ' + total) };
		target = message.guild.members.cache.get(target.id);
		target.ban(info);
		dataStore().then(async (data) => {
			await data.banDataStore.SetAsync(target.id, info);
		});
	} else {
		message.channel.send(`<@${member.id}>, ${messages.globalBanCommandFailedMessage}`)
	}
};