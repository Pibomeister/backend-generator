const fs = require('fs');

const { toPascalCase, capitalize, withoutFirstLetter, toCamelCase } = require('./utils/parsing.js');
const { writeFile, makeDirectory } = require('./utils/files.js');
const { 
    generateReadControllerContent,
    generateWriteControllerContent,
    generateBaseControllerInterfaceContent
} = require('./baseWriter');

function generateControllerClassContent(controller) {
    const name = controller.name;
    let content = `import { Request, Response } from 'express';\n
import { IBaseController } from './interfaces/base/BaseController';
import { I${name} } from './../model/interfaces/I${name}';`;
if(controller.externalRefs.length > 0) {
    for(let extRef of controller.externalRefs){
        content += `import { I${extRef} } from './../model/interfaces/I${extRef}';\n`;
    }
}
content += `
import { ${name}Business } from './../business/${name}Business';

export class ${name}Controller implements IBaseController<${name}Business> {

  public create(req: Request, res: Response): void {
    try {
      const ${toCamelCase(name)}: I${name} = <I${name}>req.body;
      const ${toCamelCase(name)}Business = new ${name}Business();
      ${toCamelCase(name)}Business.create(${toCamelCase(name)}, (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({message: 'ERROR_CREATING[${name}]', error});
        } else {
          res.json({${toCamelCase(name)}: result});
        }
      });
    } catch (error) {
      console.error('Error creating ${name}', error);
      res.status(400).json({message: 'ERROR_CREATING[${name}]', error});
    }
  }

  public update(req: Request, res: Response): void {
    try {
      const ${toCamelCase(name)}: I${name} = <I${name}>req.body;
      const _id: string = req.params.id;
      const ${toCamelCase(name)}Business = new ${name}Business();
      ${toCamelCase(name)}Business.update(_id, ${toCamelCase(name)}, (error, result) => {
        if (error) {
          res.status(500).json({message: 'ERROR_UPDATING[${name}]', error});
        }
        if (!result) {
          return res.status(404).json({
            message: 'NOT_FOUND[${name}]',
            error: new Error('${name} not found')
          });
        }
        res.json({${toCamelCase(name)}});
      });
    } catch (error) {
      console.error('Error updating ${name}', error);
      res.status(400).json({message: 'ERROR_UPDATING[${name}]', error});
    }
  }

  public delete(req: Request, res: Response): void {
    try {
      const _id: string = req.params.id;
      const ${toCamelCase(name)}Business = new ${name}Business();
      ${toCamelCase(name)}Business.delete(_id, (error, result) => {
        if (error) {
            res.status(500).json({message: 'ERROR_DELETING[${name}]', error});
        } else {
            res.json({id: _id});
        }
      });
    } catch (error) {
      console.error('Error deleting ${name}', error);
      res.status(500).json({message: 'ERROR_DELETING[${name}]', error});
    }
  }

  public retrieve(req: Request, res: Response): void {
    try {
        const ${toCamelCase(name)}Business = new ${name}Business();
        ${toCamelCase(name)}Business.retrieve((error, result) => {
            if (error) {
                res.status(500).json({message: 'ERROR_RETRIEVING[${name}]', error});
            } else {
                res.json({cellsites: result});
            }
        });
    } catch (error) {
        console.error('Error retrieving ${name}', error);
        res.status(400).json({message: 'ERROR_RETRIEVING[${name}]', error});
    }
  }

  public findById(req: Request, res: Response): void {
    try {
      const _id: string = req.params.id;
      const ${toCamelCase(name)}Business = new ${name}Business();
      ${toCamelCase(name)}Business.findById(_id, (error, result) => {
        if (error) {
          return res.status(500).json({message: 'ERROR_GETTING[${name}]', error});
        }
        if (!result) {
            return res.status(404).json({
              message: 'NOT_FOUND[${name}]', 
              error: new Error('${name} not found')
            });
        }
        res.json({${name}: result});
      });
    } catch (error) {
      console.error('Error getting ${name}', error);
      return res.status(400).json({message: 'ERROR_GETTING[${name}]', error});
    }
  }`;

    for(let methodName in controller.methods){
        const method = controller.methods[methodName];
        content += `\t${method.accessor} ${method.name}(`;
        for(let i = 0; i < method.arguments.length; i++){
            let arg = method.arguments[i];
            content += `${i == 0 ? '' : ' '}${arg.name}: ${arg.type}${(i === (method.arguments.length - 1)) ? '': ','}`;
        }
        content +=`): ${method.returnType} {\n\t\treturn new Error('${method.name} not implemented in controller ${name}');\n\t}\n\n`;
    }
    content += '}\n';
    return content;
}

module.exports = {
    writeController: async function(controller, sameDirectory) {
        const filenames = [];
        if(!sameDirectory){
            if (!fs.existsSync('./controllers/interfaces/base/BaseController.ts')) {
                makeDirectory('./controllers');
                makeDirectory('./controllers/interfaces/');
                makeDirectory('./controllers/interfaces/base');
                makeDirectory('./controllers/interfaces/common');
                const content1 = generateBaseControllerInterfaceContent();
                const content2 = generateReadControllerContent();
                const content3 = generateWriteControllerContent();
                await writeFile('./controllers/interfaces/base/BaseController.ts', content1);
                await writeFile('./controllers/interfaces/common/ReadController.ts', content2);
                await writeFile('./controllers/interfaces/common/WriteController.ts', content3);
                filenames.push('./controllers/interfaces/base/BaseController.ts');
                filenames.push('./controllers/interfaces/common/ReadController.ts');
                filenames.push('./controllers/interfaces/common/WriteController.ts');
            }
            const content4 = generateControllerClassContent(controller);
            await writeFile(`./controllers/${controller.name}Controller.ts`, content4);
            filenames.push(`./controllers/${controller.name}Controller.ts`);
            return filenames;
        }
    }
}