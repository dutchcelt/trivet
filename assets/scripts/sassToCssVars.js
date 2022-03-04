import fs from 'fs';
import lineReader from 'readline';

export const sassToCssVars = {

    convert: function({src, dest}) {

        return new Promise((resolve, reject) => {

            let sourceCssStream = lineReader.createInterface({
                input: fs.createReadStream(src)
            })

            let rebuiltFile = ':root {';

            sourceCssStream.on('line', function(line) {
                let currentLineWords = line.split(' ');
                let rebuiltLine = '';

                currentLineWords.forEach(function(value, index) {

                    if(value.includes('$')) {
                        let oldVariable = value.substring(value.indexOf('$')).replace(/;|,| |\)/g, '');
                        value = value.replace(oldVariable, '\t--' + oldVariable.replace('$', '') );
                    }

                    if(index > 0) {
                        return rebuiltLine += ' ' + value;
                    }
                    return rebuiltLine += value;

                });

                rebuiltLine = rebuiltLine.replace('!default', '') + '\n';
                if((/icomoon/ig).test(rebuiltLine)) rebuiltLine = '';
                rebuiltFile += rebuiltLine;
            });
            

            sourceCssStream.on('close', function(line) {
                if(dest) {
                    let outputFile = fs.createWriteStream(dest);

                    outputFile.once('open', function(fd) {
                        outputFile.write(rebuiltFile + '}\n');
                        outputFile.end();
                    });
                    outputFile.on('close', function() {
                        resolve(dest)
                    });
                } else {
                    let outputFile = fs.createWriteStream(src);

                    outputFile.once('open', function(fd) {
                        outputFile.write(rebuiltFile);
                        outputFile.end();
                    });
                    outputFile.on('close', function() {
                        resolve(src);
                    });
                }
            });

        });

    }
}


