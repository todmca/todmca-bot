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
		await dataStore['banDataStore'].SetAsync(target.id, info.reason);
	} else {
		message.channel.send(`<@${member.id}>, ${messages.globalBanCommandFailedMessage}`)
	}
};