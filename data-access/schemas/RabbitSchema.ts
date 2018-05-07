import { Model, model, Schema } from 'mongoose';

import { IRabbit } from './../../model/interfaces/IRabbit';

const schema: Schema = new Schema({
	age: { type: Number, required: true },
	name: { type: String, required: true },
	surname: { type: String, required: false },
});

export const RabbitSchema: Model<IRabbit> = model<IRabbit>('Rabbit', schema);