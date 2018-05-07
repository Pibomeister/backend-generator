import { IWolf } from './../model/interfaces/IWolf';
import { WolfRepository } from './../repository/WolfRepository'
import { IWolfBusiness } from './interfaces/IWolfBusiness';

export class WolfBusiness implements IWolfBusiness {

	private _wolfRepository: WolfRepository;

	constructor() {
		this._wolfRepository = new WolfRepository();
	}

	retrieve (callback: (error: any, result: Array<IWolf>) => void) {
	  this._wolfRepository.retrieve(callback);
	}

	findById (_id: string, callback: (error: any, result: IWolf) => void) {
	  this._wolfRepository.findById(_id, callback);
	}

	create (item: IWolf, callback: (error: any, result: IWolf ) => void) {
	  this._wolfRepository.create(item, callback);
	}

	update (_id: string, item: IWolf, callback: (error: any, result: IWolf) => void) {
	  this._wolfRepository.findById(_id, (err, res) => {
	      if (err || !res) {                
	          callback(err, res);
	      } else {
	          this._wolfRepository.update(res._id, item, callback);
	      }
	  });
	}

	delete (_id: string, callback: (error: any, result: any) => void) {
	  this._wolfRepository.delete(_id , callback);
	}
	public getByPack(name: string): Array<string> {
		return new Error('getByPack not implemented in repository Wolf');
	}

}
