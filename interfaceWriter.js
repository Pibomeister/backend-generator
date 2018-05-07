const { toCamelCase } = require('./utils/parsing.js');
const { writeFile, makeDirectory } = require('./utils/files.js');

function generateInterfaceContent(interf) {
    let content = '';
    if(interf.externalRefs.length > 0) {
        for(let extRef of interf.externalRefs){
            content += `import { I${extRef} } from './I${extRef}';\n`;
        }
        content += '\n';
    }
    content += `export interface I${interf.name} {\n`;
    for(let prop in interf.properties){
        content += `\t${prop}${interf.properties[prop].required ? '': '? '}: ${interf.properties[prop].type};\n`;
    }
    content += '}\n';
    return content;
}

function generateClassContent(clas) {
    let content = `import { Document } from 'mongoose';\n\n`;
    const camelCaseName = toCamelCase(clas.name);
    if(clas.externalRefs.length > 0) {
        for(let extRef of clas.externalRefs){
            content += `import { I${extRef} } from './I${extRef}';\n`;
        }
        content += '\n';
    }
    content += `import { I${clas.name} } from './interfaces/I${clas.name}';\n\n`;
    content += `export class ${clas.name} extends Document {\n\n\tprivate _${camelCaseName}: I${clas.name};\n\n`;
    content += `\tconstructor(${camelCaseName}: I${clas.name}) {\n\t\tthis._${camelCaseName} = ${camelCaseName};\n\t}\n\n`;
    for(let prop in clas.properties){
        content += `\tget ${prop}(): ${clas.properties[prop].type} {\n\t\treturn this._${camelCaseName}.${prop};\n\t}\n\n`;
    }
    for(let methodName in clas.methods){
        const method = clas.methods[methodName];
        content += `\t${method.accessor} ${method.name}(`;
        for(let i = 0; i < method.arguments.length; i++){
            let arg = method.arguments[i];
            content += `${i == 0 ? '' : ' '}${arg.name}: ${arg.type}${(i === (method.arguments.length - 1)) ? '': ','}`;
        }
        content +=`): ${method.returnType} {\n\t\treturn new Error('${method.name} not implemented in class ${clas.name}');\n\t}\n\n`;
    }
    content += '}\n';
    return content;
}

module.exports = {
    writeInterface: async function(interface, sameDirectory) {
        let filename;
        if(!sameDirectory){
            makeDirectory('./model');
            makeDirectory('./model/interfaces/');
            filename = `./model/interfaces/I${interface.name}.ts`;
        } else {
            filename = `I${interface.name}.ts`;
        }
        const content = generateInterfaceContent(interface);
        await writeFile(filename, content);
        return filename;
    },
    writeClass: async function(clas, sameDirectory) {
        let filename;
        if(!sameDirectory){
            makeDirectory('./model');
            filename = `./model/${clas.name}.ts`;
        } else {
            filename = `${clas.name}.ts`;
        }
        const content = generateClassContent(clas);
        await writeFile(filename, content);
        return filename;
    }
}