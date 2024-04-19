/**
 * The colorScheme interface.
 */
export type ColorSchemeInterface = {
    /**
     * - The media query for dark color scheme
     */
    dark: MediaQueryList;
    /**
     * - The media query for light color scheme
     */
    light: MediaQueryList;
    /**
     * - The currently active color scheme
     */
    _active: string;
    /**
     * - The currently active color scheme
     */
    current?: (false | string) | undefined;
};
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
export const colorScheme: ColorSchemeInterface;
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
export function activateColorScheme(mode?: string | undefined, element?: HTMLElement | undefined): void;
//# sourceMappingURL=activateColorScheme.d.ts.map