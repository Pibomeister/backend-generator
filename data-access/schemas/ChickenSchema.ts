import { Model, model, Schema } from 'mongoose';

import { IChicken } from './../../model/interfaces/IChicken';

const schema: Schema = new Schema({
	name: { type: String, required: true },
	age: { type: Number, required: true },
	owner: { type: String, required: false },
});

export const ChickenSchema: Model<IChicken> = model<IChicken>('Chicken', schema);