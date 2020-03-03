module.exports = data => {
	return `
		<trvt-test-elem tekst="${data.title}" tag="h1"></trvt-test-elem>
		<trvt-test-elem tekst="${data.body}"></trvt-test-elem>
		<trvt-test-elem tekst="Simple text" class="test"></trvt-test-elem>
	`;
}
