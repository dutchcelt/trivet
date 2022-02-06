import styles from "rollup-plugin-styles";

export default {
	input: './assets/index.js',
	output: {
		dir: "./assets/build",
		entryFileNames: "assets.js",
		chunkFileNames: "[name].js",
		assetFileNames: "[name][extname]",
	},
	plugins: [styles()]
};
