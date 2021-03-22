const RBX = require('@mfd/rbxdatastoreservice');

module.exports = async function() {
	await RBX.InitializeAsync(process.env.robloxCookie, process.env.robloxPlace);

	return {
		service: RBX.DataStoreService,
		banDataStore: RBX.DataStoreService.GetDataStore('GlobalBans')
	};
};