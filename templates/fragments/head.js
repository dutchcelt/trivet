module.exports = data => {
	return `
		<!--  Meta  -->
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1">

		<!-- Polyfill adoptedStyleSheets -->
		<script defer src="${data.path}${data.adoptedStyleSheets}"></script>

		<!-- Polyfill Import maps -->
		<script defer src="${data.path}${data.importmapShim}"></script>
		<script type="importmap-shim" src="${data.path}${data.importmap}"></script>

		<script type="module-shim">import "trivet"</script>
	`;
}
