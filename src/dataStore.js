const RBX = require('@mfd/rbxdatastoreservice');
const config = require('../config.json');

(async () => {
	await RBX.InitializeAsync(config.robloxCookie, config.robloxPlace);
})().then(() => {
	module.exports = {
		'service': RBX.DataStoreService,
		'banDataStore': RBX.DataStoreService.GetDataStore('GlobalBans')
	}
})