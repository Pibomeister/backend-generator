import { IWolf } from './interfaces/IWolf';

export class Wolf {

	private _wolf: IWolf;

	constructor(wolf: IWolf) {
		this._wolf = wolf;
	}

	get name(): string {
		return this._wolf.name;
	}

	get age(): number {
		return this._wolf.age;
	}

	get pack(): string {
		return this._wolf.pack;
	}

	public howl(): string {
		return new Error('howl not implemented in class Wolf');
	}

}
