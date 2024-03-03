/**
 * The colorScheme interface.
 * @typedef {object} ColorSchemeInterface
 * @property {MediaQueryList} dark - The media query for dark color scheme
 * @property {MediaQueryList} light - The media query for light color scheme
 * @property {string} _active - The currently active color scheme
 * @property {false|string=} current - The currently active color scheme
 */

/**
 * colorScheme
 * @type {ColorSchemeInterface}
 */
const colorScheme = {
	dark: window.matchMedia('(prefers-color-scheme: dark)'),
	light: window.matchMedia('(prefers-color-scheme: light)'),
	_active: '',
	get current() {
		const dark = colorScheme.dark.matches && 'dark';
		const light = colorScheme.light.matches && 'light';
		return colorScheme._active || dark || light || '';
	},
	/**  @param {string} mode */
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

/**
 * Activate a color scheme on the given element.
 *
 * @param {string=} [mode=''] - The color scheme mode to activate. If not specified, no color scheme will be activated.
 * @param {HTMLElement} [element=document.documentElement] - The HTML element on which to activate the color scheme.
 */
function activateColorScheme(mode = '', element = document.documentElement) {
	const { dataset } = element;
	dataset.colorScheme = isValidColorScheme(mode)
		? mode
		: colorScheme.current || '';
}

export { colorScheme, activateColorScheme };
