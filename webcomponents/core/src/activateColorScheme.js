/**
 * The colorScheme interface.
 * @typedef {object} ColorSchemeInterface
 * @property {object} dark -
 * @property {object} light -
 * @property {string} _active -
 * @property {string} current -
 */

/**
 * colorScheme
 * @type {ColorSchemeInterface}
 */
const colorScheme = {
	dark: window.matchMedia('(prefers-color-scheme: dark)'),
	light: window.matchMedia('(prefers-color-scheme: light)'),
	_active: undefined,
	get current() {
		const dark = colorScheme.dark.matches && 'dark';
		const light = colorScheme.light.matches && 'light';
		return colorScheme._active || dark || light;
	},
	set current(mode) {
		colorScheme._active = mode;
	},
};
colorScheme.dark.addEventListener('change', () => activateColorScheme());
colorScheme.light.addEventListener('change', () => activateColorScheme());

/**
 * isValidColorScheme
 * @param {string} mode
 * @returns {boolean}
 */
const isValidColorScheme = mode => {
	return typeof mode === 'string' && /light|dark/.test(mode);
};

/**
 * activateColorScheme
 * @param {string} mode
 * @param {HTMLElement} element
 */
function activateColorScheme(mode = '', element = document.documentElement) {
	const { dataset } = element;
	dataset.colorScheme = isValidColorScheme(mode) ? mode : colorScheme.current;
}

export { colorScheme, activateColorScheme };
