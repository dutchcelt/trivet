import fs from 'fs';
import lineReader from 'readline';

export const sassToCss = {
	convert: function ({ src, dest, rule, withPropValues }) {
		return new Promise(resolve => {
			let sourceCssStream = lineReader.createInterface({
				input: fs.createReadStream(src),
			});

			let rebuiltFile = `${rule}{\n`;

			const getlinesForGlyphs = line => {
				let currentLineWords = line.split(' ');
				let rebuiltLine = '';

				currentLineWords.forEach((value, index) => {
					if (value.includes('$')) {
						let oldVariable = value
							.substring(value.indexOf('$'))
							.replace(/;|,| |\)/g, '');
						value = value.replace(
							oldVariable,
							'\t--' + oldVariable.replace('$', '')
						);
					}

					if (index > 0) {
						return (rebuiltLine += ' ' + value + '\n');
					}
					return (rebuiltLine += value);
				});

				if (/icomoon/gi.test(rebuiltLine)) rebuiltLine = '';
				rebuiltFile += rebuiltLine;
			};

			const getlinesForClasses = line => {
				let rebuiltLine = '';
				if (line.includes('$') && !/icomoon/gi.test(line)) {
					let oldVariable = line.substring(
						line.indexOf('$'),
						line.indexOf(':')
					);
					const cssClass = oldVariable.replace('$', '.');
					const cssprop = oldVariable.replace('$', '--');
					rebuiltLine = `\t${cssClass}::before { content: var(${cssprop}); }\n`;
				}
				rebuiltFile += rebuiltLine;
			};

			sourceCssStream.on(
				'line',
				withPropValues ? getlinesForGlyphs : getlinesForClasses
			);

			sourceCssStream.on('close', function () {
				if (dest) {
					let outputFile = fs.createWriteStream(dest);

					outputFile.once('open', function () {
						outputFile.write(rebuiltFile + '}\n');
						outputFile.end();
					});
					outputFile.on('close', function () {
						resolve(dest);
					});
				} else {
					let outputFile = fs.createWriteStream(src);

					outputFile.once('open', function () {
						outputFile.write(rebuiltFile);
						outputFile.end();
					});
					outputFile.on('close', function () {
						resolve(src);
					});
				}
			});
		});
	},
};
