/**
 * throttler
 * Used to limit events that can be fired in rapid succession.
 * This can prevent an event like onresize or onscroll from thrashing the UI.
 *
 * Example: addEventListener('resize', throttler(_handler, 500), false);
 *
 * @arg {function} callback - This is the actual event handler to be passed on
 * @arg {number} ms         - The optional delay time in milliseconds (throttling)
 * @arg {object} scope      - Optional scope in which to return the function handler
 * @return {function}       - The timeout function that is triggered by the event listener on each event call
 */
const throttler = (callback, ms, scope) => {
	// An animation frame 'ticks' 60 times a second (1000ms)
	const FRAME = 1000 / 60;
	// Default delay is a single animation frame times 4
	const DELAY = ms || FRAME * 4;
	let running = false;
	const onTimeOut = (...args) => {
		requestAnimationFrame(() => {
			callback.apply(scope, args);
			running = false;
		});
	};
	return (...args) => {
		if (!running)
			running = setTimeout(
				onTimeOut,
				Math.max(0, DELAY - FRAME),
				...args
			);
	};
};

export { throttler };
