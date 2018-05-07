import { IHare } from './../model/interfaces/IHare';
import { HareRepository } from './../repository/HareRepository'
import { IHareBusiness } from './interfaces/IHareBusiness';

export class HareBusiness implements IHareBusiness {

	private _hareRepository: HareRepository;

	constructor() {
		this._hareRepository = new HareRepository();
	}

	retrieve (callback: (error: any, result: Array<IHare>) => void) {
	  this._hareRepository.retrieve(callback);
	}

	findById (_id: string, callback: (error: any, result: IHare) => void) {
	  this._hareRepository.findById(_id, callback);
	}

	create (item: IHare, callback: (error: any, result: IHare ) => void) {
	  this._hareRepository.create(item, callback);
	}

	update (_id: string, item: IHare, callback: (error: any, result: IHare) => void) {
	  this._hareRepository.findById(_id, (err, res) => {
	      if (err || !res) {                
	          callback(err, res);
	      } else {
	          this._hareRepository.update(res._id, item, callback);
	      }
	  });
	}

	delete (_id: string, callback: (error: any, result: any) => void) {
	  this._hareRepository.delete(_id , callback);
	}
}
