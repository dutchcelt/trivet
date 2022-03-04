import fs from 'fs';
import lineReader from 'readline';

export const createIconClasses = {

    convert: function({src, dest}) {

        return new Promise((resolve, reject) => {

            let sourceCssStream = lineReader.createInterface({
                input: fs.createReadStream(src)
            })

            let rebuiltFile = '@layer designsystem {\n';

            sourceCssStream.on('line', function(line) {
                let rebuiltLine = '';
                if(line.includes('$') && !(/icomoon/ig).test(line)) {
                    let oldVariable = line.substring(line.indexOf('$'), line.indexOf(':'));
                    const cssClass = oldVariable.replace('$', '.');
                    const cssprop = oldVariable.replace('$', '--');
                    rebuiltLine = `\t${cssClass}::before { content: var(${cssprop}); }\n`
                }
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


