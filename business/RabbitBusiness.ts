import { IRabbit } from './../model/interfaces/IRabbit';
import { RabbitRepository } from './../repository/RabbitRepository'
import { IRabbitBusiness } from './interfaces/IRabbitBusiness';

export class RabbitBusiness implements IRabbitBusiness {

	private _rabbitRepository: RabbitRepository;

	constructor() {
		this._rabbitRepository = new RabbitRepository();
	}

	retrieve (callback: (error: any, result: Array<IRabbit>) => void) {
	  this._rabbitRepository.retrieve(callback);
	}

	findById (_id: string, callback: (error: any, result: IRabbit) => void) {
	  this._rabbitRepository.findById(_id, callback);
	}

	create (item: IRabbit, callback: (error: any, result: IRabbit ) => void) {
	  this._rabbitRepository.create(item, callback);
	}

	update (_id: string, item: IRabbit, callback: (error: any, result: IRabbit) => void) {
	  this._rabbitRepository.findById(_id, (err, res) => {
	      if (err || !res) {                
	          callback(err, res);
	      } else {
	          this._rabbitRepository.update(res._id, item, callback);
	      }
	  });
	}

	delete (_id: string, callback: (error: any, result: any) => void) {
	  this._rabbitRepository.delete(_id , callback);
	}
}
