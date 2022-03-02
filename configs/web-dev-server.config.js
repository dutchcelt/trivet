/*
	https://modern-web.dev/docs/dev-server/cli-and-configuration/
*/

export default {
	// whether to open the browser and/or the browser path to open on
	open: false,

	// index HTML to use for SPA routing / history API fallback
	appIndex: './docs/src/index.html',

	// run in watch mode, reloading when files change
	watch: true,

	// resolve bare module imports
	nodeResolve: true,

	// JS language target to compile down to using esbuild. Recommended value is "auto", which compiles based on user agent.
	// esbuildTarget: 'auto',

	// preserve symlinks when resolve imports, instead of following symlinks to their original files
	// preserveSymlinks: boolean,

	// the root directory to serve files from. this is useful in a monorepo
	// when executing commands from a package
	rootDir: './',

	// prefix to strip from request urls
	// basePath: '/dist',

	/**
	 * Whether to log debug messages.
	 */
	// debug: boolean,

	// files to serve with a different mime type
	// mimeTypes: MimeTypeMappings,

	// middleware used by the server to modify requests/responses, for example to proxy requests or rewrite urls
	// middleware: Middleware[],

	// plugins used by the server to serve or transform files
	// plugins: Plugin[],

	// configuration for the server
	protocol: 'https',

	// hostname?: string,
	port: 9009,

	// whether to run the server with HTTP2
	http2: true,

	// path to SSL key
	// sslKey: string,

	// path to SSL certificate
	// sslCert: string,
};
