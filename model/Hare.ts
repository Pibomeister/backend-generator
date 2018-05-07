import { Document } from 'mongoose';

import { IHare } from './interfaces/IHare';

export class Hare extends Document {

	private _hare: IHare;

	constructor(hare: IHare) {
		this._hare = hare;
	}

	get name(): string {
		return this._hare.name;
	}

	get age(): number {
		return this._hare.age;
	}

	get owner(): string {
		return this._hare.owner;
	}

}
