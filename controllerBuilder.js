const readline = require('readline');

const { readClassCustomMethods } = require('./modelBuilder.js');

module.exports = {
    getController: async (modelName) => {
        const rl = readline.createInterface(process.stdin, process.stdout);
        let controller = {
            name: modelName,
            properties: {},
            methods: {},
            externalRefs: [],
        };
        console.log(`----------${modelName}Controller-----------------`);
        controller = await readClassCustomMethods(controller, rl);
        console.log(controller.methods);
        //process.stdout.write('\x1B[2J\x1B[0f');
        console.log('-----------------------------------------------');
        rl.close();
        return controller;
    }
}