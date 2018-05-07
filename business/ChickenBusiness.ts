import { IChicken } from './../model/interfaces/IChicken';
import { ChickenRepository } from './../repository/ChickenRepository'
import { IChickenBusiness } from './interfaces/IChickenBusiness';

export class ChickenBusiness implements IChickenBusiness {

	private _chickenRepository: ChickenRepository;

	constructor() {
		this._chickenRepository = new ChickenRepository();
	}

	retrieve (callback: (error: any, result: Array<IChicken>) => void) {
	  this._chickenRepository.retrieve(callback);
	}

	findById (_id: string, callback: (error: any, result: IChicken) => void) {
	  this._chickenRepository.findById(_id, callback);
	}

	create (item: IChicken, callback: (error: any, result: IChicken ) => void) {
	  this._chickenRepository.create(item, callback);
	}

	update (_id: string, item: IChicken, callback: (error: any, result: IChicken) => void) {
	  this._chickenRepository.findById(_id, (err, res) => {
	      if (err || !res) {                
	          callback(err, res);
	      } else {
	          this._chickenRepository.update(res._id, item, callback);
	      }
	  });
	}

	delete (_id: string, callback: (error: any, result: any) => void) {
	  this._chickenRepository.delete(_id , callback);
	}
}
