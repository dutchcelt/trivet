const path = require('node:path');

const Trivet = {
	trivet: require(path.join('bin', 'trivet')),
};
module.exports = Trivet;
