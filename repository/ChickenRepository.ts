import * as mongoose from 'mongoose';

import { RepositoryBase } from './base/RepositoryBase';
import { IChicken } from './../model/interfaces/IChicken';
import { ChickenSchema } from './../data-access/schemas/ChickenSchema';

export class ChickenRepository extends RepositoryBase<IChicken> {
	constructor() {
		super(ChickenSchema);
	}

}
