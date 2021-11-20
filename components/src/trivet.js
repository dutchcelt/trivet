
import typographytokens from './styles/design-tokens/typography-tokens.json';
import colourtokens from './styles/design-tokens/color-tokens.json';
import layouttokens from './styles/design-tokens/layout-tokens.json';

const root = document.documentElement;
const trvtElements = root.getElementsByTagName('*');

// we want to hide the root so that we don't get FOUC.
root.style.setProperty('visibility','hidden');

[ typographytokens, colourtokens, layouttokens ]
	.forEach(tokens => {
	Object.entries(tokens).forEach(([property,value]) => {
		root.style.setProperty(`--${property}`, value);
	});
});


const importTrvtElements = async trvtList => {
	const trvtNodes = trvtList.addedNodes || trvtList;
	const trvtTags = [...trvtNodes].map(e => e.tagName).filter(s => /trvt-/i.test(s));
	new Set(trvtTags).forEach(tag => {
		try {
			import(tag.toLowerCase());
		} catch (e) {
			console.error(e, `Can not find ${  tag}` );
		}
	});

};
importTrvtElements(trvtElements);

const config = { attributes: false, childList: true, subtree: true };
const trvtObserver = new MutationObserver(importTrvtElements);
trvtObserver.observe(document.body, config);
root.style.setProperty('visibility','visible');
