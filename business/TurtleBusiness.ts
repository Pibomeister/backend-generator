import { ITurtle } from './../model/interfaces/ITurtle';
import { TurtleRepository } from './../repository/TurtleRepository'
import { ITurtleBusiness } from './interfaces/ITurtleBusiness';

export class TurtleBusiness implements ITurtleBusiness {

	private _turtleRepository: TurtleRepository;

	constructor() {
		this._turtleRepository = new TurtleRepository();
	}

	retrieve (callback: (error: any, result: Array<ITurtle>) => void) {
	  this._turtleRepository.retrieve(callback);
	}

	findById (_id: string, callback: (error: any, result: ITurtle) => void) {
	  this._turtleRepository.findById(_id, callback);
	}

	create (item: ITurtle, callback: (error: any, result: ITurtle ) => void) {
	  this._turtleRepository.create(item, callback);
	}

	update (_id: string, item: ITurtle, callback: (error: any, result: ITurtle) => void) {
	  this._turtleRepository.findById(_id, (err, res) => {
	      if (err || !res) {                
	          callback(err, res);
	      } else {
	          this._turtleRepository.update(res._id, item, callback);
	      }
	  });
	}

	delete (_id: string, callback: (error: any, result: any) => void) {
	  this._turtleRepository.delete(_id , callback);
	}
}
