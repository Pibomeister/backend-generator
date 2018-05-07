import { Model, model, Schema } from 'mongoose';

import { IHare } from './../../model/interfaces/IHare';

const schema: Schema = new Schema({
	name: { type: String, required: true },
	age: { type: Number, required: true },
	owner: { type: String, required: false },
});

export const HareSchema: Model<IHare> = model<IHare>('Hare', schema);