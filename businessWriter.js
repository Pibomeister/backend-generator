const fs = require('fs');

const { toCamelCase, capitalize, withoutFirstLetter, toPascalCase } = require('./utils/parsing.js');
const { writeFile, makeDirectory } = require('./utils/files.js');
const { 
    generateBaseReadInterfaceContent, 
    generateBaseWriteInterfaceContent, 
    generateBaseBusinessInterfaceContent
} = require('./baseWriter');

function generateBusinessReadContent(name){
    const repositoryName = `_${toCamelCase(name)}Repository`;
    return `\n\tretrieve (callback: (error: any, result: Array<I${name}>) => void) {
\t  this.${repositoryName}.retrieve(callback);
\t}\n
\tfindById (_id: string, callback: (error: any, result: I${name}) => void) {
\t  this.${repositoryName}.findById(_id, callback);
\t}\n`;
}

function generateBusinessWriteContent(name){
    const repositoryName = `_${toCamelCase(name)}Repository`;
    return `\n\tcreate (item: I${name}, callback: (error: any, result: I${name} ) => void) {
\t  this.${repositoryName}.create(item, callback);
\t}\n
\tupdate (_id: string, item: I${name}, callback: (error: any, result: I${name}) => void) {
\t  this.${repositoryName}.findById(_id, (err, res) => {
\t      if (err || !res) {                
\t          callback(err, res);
\t      } else {
\t          this.${repositoryName}.update(res._id, item, callback);
\t      }
\t  });
\t}\n
\tdelete (_id: string, callback: (error: any, result: any) => void) {
\t  this.${repositoryName}.delete(_id , callback);
\t}\n`;
}


function generateBusinessInterfaceContent(business) {
    let content = `import { IBaseBusiness } from './base/BaseBusiness';\n`;
    content += `import { I${business.name} } from './../../model/interfaces/I${business.name}';\n`;
    if(business.externalRefs.length > 0) {
        for(let extRef of business.externalRefs){
            content += `import { I${extRef} } from './../../model/interfaces/I${extRef}';\n`;
        }
    }
    content += `\nexport interface I${business.name}Business  extends IBaseBusiness<I${business.name}> {\n`;
    for(let methodName in business.methods){
        const method = business.methods[methodName];
        content += `\t${method.accessor} ${method.name}(`;
        for(let i = 0; i < method.arguments.length; i++){
            let arg = method.arguments[i];
            content += `${i == 0 ? '' : ' '}${arg.name}: ${arg.type}${(i === (method.arguments.length - 1)) ? '': ','}`;
        }
        content +=`): ${method.returnType} ;\n`;
    }
    content += '}\n';
    return content;
}



function generateBusinessClassContent(business) {
    const name = business.name;
    let content = `import { I${name} } from './../model/interfaces/I${name}';\n`;
    content += `import { ${name}Repository } from './../repository/${name}Repository'\n`
    content += `import { I${name}Business } from './interfaces/I${name}Business';\n\n`;
    content += `export class ${name}Business implements I${name}Business {\n`;
    content += `\n\tprivate _${toCamelCase(name)}Repository: ${name}Repository;\n\n\tconstructor() {\n\t\tthis._${toCamelCase(name)}Repository = new ${name}Repository();\n\t}\n`;
    content += generateBusinessReadContent(name);
    content += generateBusinessWriteContent(name);
    for(let methodName in business.methods){
        const method = business.methods[methodName];
        content += `\t${method.accessor} ${method.name}(`;
        for(let i = 0; i < method.arguments.length; i++){
            let arg = method.arguments[i];
            content += `${i == 0 ? '' : ' '}${arg.name}: ${arg.type}${(i === (method.arguments.length - 1)) ? '': ','}`;
        }
        content +=`): ${method.returnType} {\n\t\treturn new Error('${method.name} not implemented in business ${name}');\n\t}\n\n`;
    }
    content += '}\n';
    return content;
}

module.exports = {
    writeBusiness: async function(business, sameDirectory) {
        const filenames = [];
        if(!sameDirectory){
            if (!fs.existsSync('./business/interfaces/base/BaseBusiness.ts')) {
                makeDirectory('./business');
                makeDirectory('./business/interfaces/');
                makeDirectory('./business/interfaces/base');
                makeDirectory('./business/interfaces/common');
                const content1 = generateBaseBusinessInterfaceContent();
                const content2 = generateBaseReadInterfaceContent();
                const content3 = generateBaseWriteInterfaceContent();
                await writeFile('./business/interfaces/base/BaseBusiness.ts', content1);
                await writeFile('./business/interfaces/common/Read.ts', content2);
                await writeFile('./business/interfaces/common/Write.ts', content3);
                filenames.push('./business/interfaces/base/BaseBusiness.ts');
                filenames.push('./business/interfaces/common/Read.ts');
                filenames.push('./business/interfaces/common/Write.ts');
            }
            const content4 = generateBusinessInterfaceContent(business);
            const content5 = generateBusinessClassContent(business);
            await writeFile(`./business/interfaces/I${business.name}Business.ts`, content4);
            await writeFile(`./business/${business.name}Business.ts`, content5);
            filenames.push(`./business/interfaces/I${business.name}Business.ts`);
            filenames.push(`./business/${business.name}Business.ts`);
            return filenames;
        }
    }
}