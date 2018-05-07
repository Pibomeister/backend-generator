const fs = require('fs');

const { toCamelCase, capitalize, withoutFirstLetter } = require('./utils/parsing.js');
const { writeFile, makeDirectory } = require('./utils/files.js');
const { 
    generateBaseReadInterfaceContent, 
    generateBaseWriteInterfaceContent, 
    generateBaseRepositoryContent
} = require('./baseWriter');
function generateSchemaContent(interf) {
    let content = `import { Model, model, Schema } from 'mongoose';\n\n`;
    content += `import { I${interf.name} } from './../../model/interfaces/I${interf.name}';\n`;
    if(interf.externalRefs.length > 0) {
        for(let extRef of interf.externalRefs){
            content += `import { I${extRef} } from './../../model/interfaces/I${extRef}';\n`;
        }
    }
    content += `\nconst schema: Schema = new Schema({\n`;
    for(let prop in interf.properties){
        if(interf.properties[prop].isInterface){
            content += `\t${prop}: { type: Schema.Types.ObjectId, ref: '${withoutFirstLetter(interf.properties[prop].type)}', required: ${interf.properties[prop].required ? 'true': 'false'} },\n`;
        } else {
            content += `\t${prop}: { type: ${capitalize(interf.properties[prop].type)}, required: ${interf.properties[prop].required ? 'true': 'false'} },\n`;
        }
    }
    content += `});\n\nexport const ${interf.name}Schema: Model<I${interf.name}> = model<I${interf.name}>('${interf.name}', schema);`
    return content;
}


function generateRepositoryContent(repository) {
    const name = repository.name;
    let content = `import * as mongoose from 'mongoose';\n\nimport { RepositoryBase } from './base/RepositoryBase';\n`;
    content += `import { I${name} } from './../model/interfaces/I${name}';\n`; 
    content += `import { ${name}Schema } from './../data-access/schemas/${name}Schema';\n\n`;
    content += `export class ${name}Repository extends RepositoryBase<I${name}> {\n\tconstructor() {\n\t\tsuper(${name}Schema);\n\t}\n\n`;
    
    for(let methodName in repository.methods){
        const method = repository.methods[methodName];
        content += `\t${method.accessor} ${method.name}(`;
        for(let i = 0; i < method.arguments.length; i++){
            let arg = method.arguments[i];
            content += `${i == 0 ? '' : ' '}${arg.name}: ${arg.type}${(i === (method.arguments.length - 1)) ? '': ','}`;
        }
        content +=`): ${method.returnType} {\n\t\treturn new Error('${method.name} not implemented in repository ${name}');\n\t}\n\n`;
    }
    content += '}\n';
    return content;
}

module.exports = {
    writeSchema: async function(interface, sameDirectory) {
        let filename;
        if(!sameDirectory){
            makeDirectory('./data-access');
            makeDirectory('./data-access/schemas/');
            filename = `./data-access/schemas/${interface.name}Schema.ts`;
        } else {
            filename = `${interface.name}Schema.ts`;
        }
        const content = generateSchemaContent(interface);
        await writeFile(filename, content);
        return filename;
    },
    writeRepository: async function(repository, sameDirectory) {
        const filenames = [];
        if(!sameDirectory){
            if (!fs.existsSync('./repository/base/RepositoryBase.ts')) {
                makeDirectory('./repository');
                makeDirectory('./repository/base/');
                makeDirectory('./repository/interfaces/');
                makeDirectory('./repository/interfaces/base/');
                const content1 = generateBaseRepositoryContent();
                const content2 = generateBaseReadInterfaceContent();
                const content3 = generateBaseWriteInterfaceContent();
                await writeFile('./repository/base/RepositoryBase.ts', content1);
                await writeFile('./repository/interfaces/base/Read.ts', content2);
                await writeFile('./repository/interfaces/base/Write.ts', content3);
                filenames.push('./repository/base/RepositoryBase.ts');
                filenames.push('./repository/interfaces/base/Read.ts');
                filenames.push('./repository/interfaces/base/Write.ts');
            }
            const content = generateRepositoryContent(repository);
            await writeFile(`./repository/${repository.name}Repository.ts`, content);
            filenames.push(`./repository/${repository.name}Repository.ts`);
            return filenames;
        }
    }
}