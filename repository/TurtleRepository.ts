import * as mongoose from 'mongoose';

import { RepositoryBase } from './base/RepositoryBase';
import { ITurtle } from './../model/interfaces/ITurtle';
import { TurtleSchema } from './../data-access/schemas/TurtleSchema';

export class TurtleRepository extends RepositoryBase<ITurtle> {
	constructor() {
		super(TurtleSchema);
	}

}
