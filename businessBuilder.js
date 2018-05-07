const readline = require('readline');

const { readClassCustomMethods } = require('./modelBuilder.js');

module.exports = {
    getBusiness: async (modelName) => {
        const rl = readline.createInterface(process.stdin, process.stdout);
        let business = {
            name: modelName,
            properties: {},
            methods: {},
            externalRefs: [],
        };
        console.log(`----------${modelName}Business-----------------`);
        business = await readClassCustomMethods(business, rl);
        console.log(business.methods);
        //process.stdout.write('\x1B[2J\x1B[0f');
        console.log('-----------------------------------------------');
        rl.close();
        return business;
    }
}