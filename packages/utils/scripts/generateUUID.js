/**
 * Generates a Universally Unique Identifier (UUID).
 *
 * @returns {string} A UUID.
 */
const generateUUID = () => {
	function ff(s) {
		var pt = (Math.random().toString(16) + '000000000').substr(2, 8);
		return s ? '-' + pt.substr(0, 4) + '-' + pt.substr(4, 4) : pt;
	}
	return ff() + ff(true) + ff(true) + ff();
};

export { generateUUID };
