const RBX = require('@mfd/rbxdatastoreservice');
const config = require('../config.json');

module.exports = async function() {
	await RBX.InitializeAsync(config.robloxCookie, config.robloxPlace);

	return {
		service: RBX.DataStoreService,
		banDataStore: RBX.DataStoreService.GetDataStore('GlobalBans')
	};
};