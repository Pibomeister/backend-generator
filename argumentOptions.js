module.exports = {
    initArgOptions : {
        name: {
            type: 'string',
            demand: true,
            desc: 'The name of the project to initialize',
            alias: 'n'
        },
        secure : {
            type: 'boolean',
            desc: 'Wether or not to use helmetjs and ssl redirect',
            alias: 's'
        },
        log : {
            type: 'boolean',
            desc: 'Wether or not to use morgan to log requests',
            alias: 'l'
        },
        extraDependencies : {
            type: 'array',
            desc: 'Extra dependencies to add to the project\n [Note: use exact npm names]',
        },
        extraDevDependencies : {
            type: 'array',
            desc: 'Extra development dependencies to add to the project [Note: use exact npm names]'
        }
    },
    generateModelArgOptions : {
        name: {
            demand: true,
            type: 'string',
            desc: 'The model name',
            alias: 'n'
        },
        controller : {
            type: 'boolean',
            desc: 'Wether or not to create a controller for the model',
            alias: 'c'
        },
        business: {
            type: 'boolean',
            desc: 'Wether or not to create a business for the model (in case controller is set to false)',
            alias: 'b'
        },
        repository : {
            type: 'boolean',
            desc: 'Wether or not to create a repository for the model (in case controller is set to false)',
            alias: 'r'
        },
        class : {
            type: 'boolean',
            desc: 'Wether or not to create a class for the model',
            alias: 'cl'
        },
        sameDirectory : {
            type: 'boolean',
            desc: 'Wether or not to create the interface file in the same directory',
            alias: 'sD'
        }
    }
};