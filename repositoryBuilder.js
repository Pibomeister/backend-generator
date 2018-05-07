const readline = require('readline');

const { readClassCustomMethods } = require('./modelBuilder.js');

module.exports = {
    getRepository: async (modelName) => {
        const rl = readline.createInterface(process.stdin, process.stdout);
        let repo = {
            name: modelName,
            properties: {},
            methods: {},
            externalRefs: [],
        };
        console.log(`----------${modelName}Repository-----------------`);
        repo = await readClassCustomMethods(repo, rl);
        console.log(repo.methods);
        // process.stdout.write('\x1B[2J\x1B[0f');
        console.log('-----------------------------------------------');
        rl.close();
        return repo;
    }
}