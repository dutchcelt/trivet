const trvtElements = document.getElementsByTagName('*');

const importTrvtElements = trvtList => {
	const trvtNodes = trvtList.addedNodes || trvtList;
	const trvtTags = [...trvtNodes].map(e => e.tagName).filter(s => /trvt-/i.test(s));
	new Set(trvtTags).forEach(tag => {
		try {
			import(tag.toLowerCase())
		} catch (e) {
			console.error(e, 'Can not find ' + tag );
		}
	});
};
importTrvtElements(trvtElements);

const config = { attributes: false, childList: true, subtree: true };
const trvtObserver = new MutationObserver(importTrvtElements);
trvtObserver.observe(document.body, config);

