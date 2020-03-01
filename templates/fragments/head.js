module.exports = data => {
	return `

	<!--  Meta  -->
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1">

	<link rel="stylesheet" href="${data.path}${data.styles}" media="screen"/>

	<!-- FT polyfill service -->
	<script src="${data.polyfillService}?features=${data.polyfillFeatures}&flags=gated"></script>

	<script defer src="${data.path}${data.adoptedStyleSheets}"></script>
	<!-- Import maps -->
	<script defer src="${data.path}${data.importmapShim}"></script>
	<script type="importmap-shim" scr="">
	{
		"imports": {
			"jquery": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js",
			"simpleTest":"/components/test/main.js",
			"styleTest":"/components/test/test.css"
		}
	}
	</script>

	<script type="module-shim">
	  import "simpleTest";
	</script>
	<!--  Start loading scripts  -->
	<!--script type="module" src="${data.path}${data.trivet}"></script-->

	`;
}
