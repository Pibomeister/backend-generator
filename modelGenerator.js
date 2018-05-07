const { toCamelCase } = require('./utils/parsing.js');

const modelBuilder = require('./modelBuilder.js');
const repositoryBuilder = require('./repositoryBuilder.js');
const businessBuilder = require('./businessBuilder.js');
const controllerBuilder = require('./controllerBuilder.js');

const interfaceWriter = require('./interfaceWriter.js');
const repositoryWriter = require('./repositoryWriter.js');
const businessWriter = require('./businessWriter.js');
const controllerWriter = require('./controllerWriter.js');


module.exports = {
    generateModel: async (opts) => {
        const name = toCamelCase(opts.modelName);
        console.log(`Generating new model ${name}...`);
        let files = [];
        const interf = await modelBuilder.getInterface(name);
        const interFilename = await interfaceWriter.writeInterface(interf, opts.sameDirectory);
        files.push(interFilename);
        if(opts.class){
            const clas = await modelBuilder.getClass(name, interf);
            const clasFilename = await interfaceWriter.writeClass(clas, opts.sameDirectory);
            files.push(clasFilename);
        }
        if(opts.repository){
            const schemaFilename = await repositoryWriter.writeSchema(interf, opts.sameDirectory);
            files.push(schemaFilename);
            const repo = await repositoryBuilder.getRepository(name);
            const repoFiles = await repositoryWriter.writeRepository(repo, opts.sameDirectory);
            files = [...files, ...repoFiles];
        } else {
            console.log("Don't create with repository");
        }
        if(opts.business){
            const bus = await businessBuilder.getBusiness(name);
            const businessFiles = await businessWriter.writeBusiness(bus, opts.sameDirectory);
            files = [...files, ...businessFiles];
        } else {
            console.log("Don't create with business");
        }
        if(opts.controller){
            const cont = await controllerBuilder.getController(name);
            const controllerFiles = await controllerWriter.writeController(cont, opts.sameDirectory);
            files = [...files, ...controllerFiles];
        } else {
            console.log("Don't create with controller");
        }
        return files;
    }
};



// modelBuilder.getInterface()
// .then( interf => {
//     return interfaceWriter.writeInterface(interf);
// }).then( filename => {
//     console.log('Wrote file: ', filename);
// }).catch(err => console.error(err));
