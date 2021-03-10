const dataStore = require('../dataStore.js');
const messages = require('../../messages.json');

module.exports = async function(message, args, client) {
	const id = args.shift();

	const bans = await message.guild.fetchBans();

	if (bans.has(id)) {
		message.guild.members.unban(id);
		dataStore().then(async (data) => {
			await data.banDataStore.RemoveAsync(id);
		})
	}
};