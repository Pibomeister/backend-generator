import { Model, model, Schema } from 'mongoose';

import { ITurtle } from './../../model/interfaces/ITurtle';

const schema: Schema = new Schema({
	name: { type: String, required: true },
	age: { type: Number, required: true },
	owner: { type: String, required: false },
});

export const TurtleSchema: Model<ITurtle> = model<ITurtle>('Turtle', schema);