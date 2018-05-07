import { Document } from 'mongoose';

import { ITurtle } from './interfaces/ITurtle';

export class Turtle extends Document {

	private _turtle: ITurtle;

	constructor(turtle: ITurtle) {
		this._turtle = turtle;
	}

	get name(): string {
		return this._turtle.name;
	}

	get age(): number {
		return this._turtle.age;
	}

	get owner(): string {
		return this._turtle.owner;
	}

}
