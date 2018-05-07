import * as mongoose from 'mongoose';

import { RepositoryBase } from './base/RepositoryBase';
import { IHare } from './../model/interfaces/IHare';
import { HareSchema } from './../data-access/schemas/HareSchema';

export class HareRepository extends RepositoryBase<IHare> {
	constructor() {
		super(HareSchema);
	}

}
