import defaultClassesMap from './defaultClassMap.js';
import bemMap from './bemMap.js';

const Bem = ({block, element, modifier}) => Object.create({block, element, modifier});

const attributesObject = (attrs, bemObj) => {
	['block','element','modifier'].forEach(n => {
		bemObj[n] = attrs.getNamedItem(n) && attrs.getNamedItem(n).value || bemObj[n] || '';
	});
	return bemObj;
}

export default (attrs, bemObj) => {
	const attrsObject = attributesObject(attrs, Bem(bemObj));
	return bemMap(attrsObject,defaultClassesMap());
}
