module.exports = data => {
	return `

	<!--  Meta  -->
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1">

	<link rel="stylesheet" href="${data.path}${data.styles}" media="screen"/>

	<!-- FT polyfill service -->
	<script src="${data.polyfillService}$features=${data.polyfillFeatures}&flags=gated"></script>

	<!--  Start loading scripts  -->
	<script type="module" src="${data.path}${data.trivet}"></script>
	
	`;
}
