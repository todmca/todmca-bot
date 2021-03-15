const express = require('express');
const server = express();

server.all('/', (req, res) => {
	res.send('OK');
});

module.exports = () => server.listen(3000);