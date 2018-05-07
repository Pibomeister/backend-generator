import { Document } from 'mongoose';

import { IRabbit } from './interfaces/IRabbit';

export class Rabbit extends Document {

	private _rabbit: IRabbit;

	constructor(rabbit: IRabbit) {
		this._rabbit = rabbit;
	}

	get age(): number {
		return this._rabbit.age;
	}

	get name(): string {
		return this._rabbit.name;
	}

	get surname(): string {
		return this._rabbit.surname;
	}

}
