function generateBaseRepositoryContent() {
    return `import { ObjectId } from 'bson';
import { Document, Model, Types } from 'mongoose';

import { IWrite } from '../interfaces/base/Write';
import { IRead } from '../interfaces/base/Read';

export class RepositoryBase<T extends Document> implements IRead<T>, IWrite<T> {

    protected _model: Model<Document>;

    constructor (schemaModel: Model<Document>) {
        this._model = schemaModel;
    }

    create (item: T, callback: (error: any, result: T) => void) {
        this._model.create(item, callback);
    }

    retrieve (callback: (error: any, result: Array<T>) => void) {
            this._model.find({}, callback)
    }

    update (_id: string, item: T, callback: (error: any, result: T) => void) {
            this._model.update({_id }, item, callback);
    }

    delete (_id: string, callback: (error: any, result: string) => void) {
        this._model.remove({_id: this.toObjectId(_id)}, (err) => callback(err, _id));
    }

    findById (_id: string, callback: (error: any, result: T) => void) {
        this._model.findById( _id, callback);
    }

    private toObjectId (_id: string): Types.ObjectId {
        return Types.ObjectId.createFromHexString(_id)
    }

}`;
}

function generateBaseReadInterfaceContent() {
    return `export interface IRead<T> {
    retrieve: (callback: (error: any, result: Array<T>) => void) => void;
    findById: (id: string, callback: (error: any, result: T) => void) => void;
}`
}

function generateBaseWriteInterfaceContent() {
    return `export interface IWrite<T> {
    create: (item: T, callback: (error: any, result: T ) => void) => void;
    update: (_id: string, item: T, callback: (error: any, result: T) => void) => void ;
    delete: (_id: string, callback: (error: any, result: string) => void) => void;
}`
}

function generateBaseBusinessInterfaceContent() {
    return `import { IRead } from '../common/Read';
    import { IWrite } from '../common/Write';
    
    export interface IBaseBusiness<T> extends IRead<T>, IWrite<T> { }`;
}

function generateBaseControllerInterfaceContent() {
    return `import { IBaseBusiness } from './../../../business/interfaces/base/BaseBusiness';
import { IWriteController } from '../common/WriteController';
import { IReadController } from '../common/ReadController';

export interface IBaseController<T extends IBaseBusiness<Object>> extends IReadController, IWriteController {

}`
}

function generateReadControllerContent(){
return `import { RequestHandler } from 'express';

export interface IReadController {
    retrieve: RequestHandler;
    findById: RequestHandler;
}`;
}

function generateWriteControllerContent(){
return `import { RequestHandler } from 'express';

export interface IWriteController {
    create: RequestHandler;
    update: RequestHandler;
    delete: RequestHandler;
}`
}

module.exports = {
    generateBaseWriteInterfaceContent,
    generateBaseReadInterfaceContent,
    generateBaseRepositoryContent,
    generateBaseBusinessInterfaceContent,
    generateBaseControllerInterfaceContent,
    generateReadControllerContent,
    generateWriteControllerContent
};