import { createMachine, assign } from '@xstate/fsm';

const contentLoadedMachine = createMachine({
	id: 'contentloaded',
	initial: 'loading',
	states: {
		loading: {
			on: {
				READY: {
					target: 'loaded',
					actions: assign(() => {
						document.body.dataset.loaded = 'true';
					})
				}
			}
		},
		loaded: {
			type: 'final'
		},
	}
});

export { contentLoadedMachine }
