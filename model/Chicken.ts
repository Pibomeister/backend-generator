import { Document } from 'mongoose';

import { IChicken } from './interfaces/IChicken';

export class Chicken extends Document {

	private _chicken: IChicken;

	constructor(chicken: IChicken) {
		this._chicken = chicken;
	}

	get name(): string {
		return this._chicken.name;
	}

	get age(): number {
		return this._chicken.age;
	}

	get owner(): string {
		return this._chicken.owner;
	}

}
