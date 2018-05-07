const yargs = require('yargs');
const { initArgOptions, generateModelArgOptions } = require('./argumentOptions.js');
const modelGenerator = require('./modelGenerator.js');
const argv = yargs
    .command(['init', 'i'], 'Initialize a Typescript MEAN backend', initArgOptions)
    .command(['generate_model', 'gm'], 'Generate a model', generateModelArgOptions)
    .alias('h', 'help')
    .help('help')
    .argv;

const command = argv._[0];

function outputCreatedFiles(filenames){
    console.log(`Generated (${filenames.length}) file(s)`);
    for(let filename of filenames){
        console.log(`- ${filename}`);
    }
}

if (command === 'init' || command === 'i') {
    console.log(`Initializing project ${argv.name}...`)
    if(argv.secure){
        console.log('-Make project secure');
    }
    if(argv.log){
        console.log('-Log requests with morgan');
    }
    if(!!argv.extraDependencies && argv.extraDependencies.length > 0) {
        console.log('-Add extra dependencies: ', argv.extraDependencies);
    }
    if(!!argv.extraDevDependencies && argv.extraDevDependencies.length > 0) {
        console.log('-Add extra development dependencies: ', argv.extraDevDependencies);
    }
}else if( command === 'generate_model' || command === 'gm') {
    const opts = {
        modelName: argv.name,
        controller: argv.controller,
        repository: argv.repository,
        business: argv.business,
        class: argv.class,
        sameDirectory: argv.sameDirectory
    };
    modelGenerator.generateModel(opts)
    .then( createdFiles => {
        outputCreatedFiles(createdFiles);
    })
    .catch( err => console.error(err));

}
