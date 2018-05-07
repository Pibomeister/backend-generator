import { Model, model, Schema } from 'mongoose';

import { IWolf } from './../../model/interfaces/IWolf';

const schema: Schema = new Schema({
	name: { type: String, required: true },
	age: { type: Number, required: true },
	pack: { type: String, required: false },
});

export const WolfSchema: Model<IWolf> = model<IWolf>('Wolf', schema);