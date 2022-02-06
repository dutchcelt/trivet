export const CSSString2CSSStyleSheet = ( css ) => {
	const style = document.createElement ( 'style' );
	style.innerText = css;
	document.head.appendChild ( style );
	const {sheet} = style;
	document.head.removeChild ( style );
	console.log(sheet);
	return sheet;
}
