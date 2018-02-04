module.exports = data => {
	return `
	<h1>${data.title}</h1>
	<p>${data.body}</p>
	<div data-trivet="test" class="test"></div>
	<div data-trivet="test" class="test"></div>
	`;
}
