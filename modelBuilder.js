const readline = require('readline');

async function readInterfaceProperties(interf, rl){

    const prop = await askAboutProperty('Q', rl);
    if(!prop){
        return interf;
    } else {
        interf.properties[prop.name] = {
            type : prop.type[0],
            required : prop.required,
            isInterface: !!prop.type[1]
        };
        if(!!prop.type[1] && prop.type[1] !== interf.name && interf.externalRefs.indexOf(prop.type[1]) === -1){
            interf.externalRefs.push(prop.type[1]);
        }
        return await readInterfaceProperties(interf, rl);
    }
}

async function readClassCustomMethods(clas, rl) {
    const method = await askAboutMethod('Q', clas, rl);
    if(!method) {
        return clas;
    } else {
        clas.methods[method.name] = {
            ...method
        };
        return await readClassCustomMethods(clas, rl);
    }
}

async function readMethodArguments(clas, methodName, rl) {
    const arg = await askAboutArgument('Q', rl);
    if(!arg){
        return !clas.methods[methodName] || !clas.methods[methodName].arguments 
            ? [] 
            : clas.methods[methodName].arguments;
    }
    if(!clas.methods[methodName]) {
        clas.methods[methodName] = {
            arguments: []
        };
    }
    clas.methods[methodName].arguments.push({name: arg.name, type: arg.type[0] });
    if(!!arg.type[1] && arg.type[1] !== clas.name && clas.externalRefs.indexOf(arg.type[1]) === -1){
        clas.externalRefs.push(arg.type[1]);
    }
    return await readMethodArguments(clas, methodName, rl);
}

async function askQuestion(question, options, rl) {
    const obj = new Promise((resolve, reject)=> {
        const q = !!options ?  `${question}\t${options}\n>` : `${question}\n>` ;
        rl.question(q, (property) => {  
            resolve(property);
        });
    });
    return obj;
}

async function askPrimitiveType(interruptKey, rl) {
    const type = await askQuestion('Primitive type', '[1. string, 2. number, 3. boolean, 4. Date, 5. any ]', rl);
    switch(type){
        case interruptKey:
            return false;
        case '1':
            return 'string';
        case '2':
            return 'number';
        case '3':
            return 'boolean';
        case '4':
            return 'Date';
        default:
            return 'any';
    }
}

async function askAccessorType(interruptKey, rl) {
    const type = await askQuestion('Method accessor type', '[1. public, 2. private, 3. protected]', rl);
    switch(type){
        case interruptKey:
            return false;
        case '1':
            return 'public';
        case '2':
            return 'private';
        case '3':
            return 'protected';
        default:
            return ' ';
    }
}

async function askType(interruptKey, message, rl) {
    const q = !!message ? `${message} type` : 'Property type';
    const tempType = await askQuestion(q, '[1. primitive, 2. Array, 3. Interface]', rl);
    if(tempType === interruptKey) return false;
    else if (tempType === '1') {
        let temp = await askPrimitiveType(interruptKey, rl);
        type = !!temp ? [temp, false] : false;
    }
    else if (tempType === '2') {
        let temp = await askType(interruptKey, 'Array', rl);
        type = !!temp ? [`Array<${temp[0]}>`, temp[1]] : false;
    } else {
        let temp = await askQuestion('Interface name', false, rl);
        type = !!temp ? [`I${temp}`, temp] : false;
    }
    return type;
}

async function askRequired(interruptKey, rl) {
    let temp = await askQuestion('Property required?', '(y/n)', rl);
    if(temp === interruptKey)return false;
    return { required: temp.toLowerCase() === 'y'};
}

async function askAboutProperty(interruptKey, rl) {
    let name = await askQuestion('Property name', false, rl);
    if(name === interruptKey) return false;
    const type = await askType(interruptKey, false, rl);
    if(!type) return false;
    const requiredRespone = await askRequired(interruptKey, rl);
    if(!requiredRespone) return false;
    const required = requiredRespone.required;
    console.log('\n------------------');
    return {
        name,
        type,
        required
    };
}

async function askAboutMethod(interruptKey, clas, rl) {
    const name = await askQuestion('Method name', false, rl);
    if(name === interruptKey) return false;
    const accessor = await askAccessorType(interruptKey, rl);
    if(!accessor) return false;
    const returnType = await askType(interruptKey, 'Method return', rl);
    if(!returnType) return false;
    if(!!returnType[1] && returnType[1] !== clas.name && clas.externalRefs.indexOf(returnType[1]) === -1){
        clas.externalRefs.push(returnType[1]);
    }
    const arguments = await readMethodArguments(clas, name, rl);
    return { name, accessor, returnType: returnType[0], arguments};
}

async function askAboutArgument(interruptKey, rl) {
    let name = await askQuestion('Argument name', false, rl);
    if(name === interruptKey) return false;
    const type = await askType(interruptKey, 'Argument', rl);
    if(!type) return false;
    console.log('\n------------------');
    return {
        name,
        type,
    };
}

module.exports = {
    getInterface: async (modelName) => {
        const rl = readline.createInterface(process.stdin, process.stdout);
        let interf = {
            name: modelName,
            properties: {},
            externalRefs: [],
        };
        console.log(`----------I${modelName}-----------------`);
        interf = await readInterfaceProperties(interf, rl);
        console.log(interf.properties);
        // process.stdout.write('\x1B[2J\x1B[0f');
        console.log('-----------------------------------------------');
        rl.close();
        return interf;
    },
    getClass: async (modelName, interface) => {
        const rl = readline.createInterface(process.stdin, process.stdout);
        let clas = {
            name: modelName,
            properties: {},
            methods: {},
            externalRefs: [],
        };
        if(!!interface){
            clas.properties = {...interface.properties},
            clas.externalRefs = [...interface.externalRefs]
        } else {
            clas = await readInterfaceProperties(clas, rl);
        }
        console.log(`----------${modelName}-----------------`);
        clas = await readClassCustomMethods(clas, rl);
        console.log(clas.properties + '\n');
        console.log(clas.methods);
        console.log('-----------------------------------------------');
        rl.close();
        return clas;
    },
    readClassCustomMethods
}