import styles from 'rollup-plugin-styles';

export default {
	input: './icons/index.js',
	preserveModules: false,
	output: {
		dir: './build',
		entryFileNames: 'icons.js',
		chunkFileNames: '[name].js',
		assetFileNames: '[name][extname]',
	},
	plugins: [styles()],
};
