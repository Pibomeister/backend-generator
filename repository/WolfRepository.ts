import * as mongoose from 'mongoose';

import { RepositoryBase } from './base/RepositoryBase';
import { IWolf } from './../model/interfaces/IWolf';
import { WolfSchema } from './../data-access/schemas/WolfSchema';

export class WolfRepository extends RepositoryBase<IWolf> {
	constructor() {
		super(WolfSchema);
	}

	public getByPack(name: string): Array<string> {
		return new Error('getByPack not implemented in repository Wolf');
	}

}
