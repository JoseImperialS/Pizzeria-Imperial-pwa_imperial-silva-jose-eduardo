module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{html,css,js,json,png,jpg,jpeg,webp,svg,ico}'
	],
	globIgnores: [
		'node_modules/**',
		'docs/**',
		'servidor-ssr*/**',
		'**/lighthouse*',
		'**/*.report.html',
		'workbox-config.js',
		'sw.js',
		'workbox-*.js',
		'**/*.map'
	],
	// Tus fotos más pesadas (alitas, tiramisú) pasan de 1 MB; subimos el límite a 5 MB
	maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
	swDest: 'sw.js',
	skipWaiting: true,
	clientsClaim: true,
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};
