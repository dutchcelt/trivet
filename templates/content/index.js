module.exports = data => {
	return `
	<h1>${data.title}</h1>
	<p>${data.body}</p>
	<template data-trivet="test"></template>
	`;
}
