import * as mongoose from 'mongoose';

import { RepositoryBase } from './base/RepositoryBase';
import { IRabbit } from './../model/interfaces/IRabbit';
import { RabbitSchema } from './../data-access/schemas/RabbitSchema';

export class RabbitRepository extends RepositoryBase<IRabbit> {
	constructor() {
		super(RabbitSchema);
	}

}
