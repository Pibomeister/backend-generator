import { IBaseBusiness } from './base/BaseBusiness';
import { IWolf } from './../../model/interfaces/IWolf';

export interface IWolfBusiness  extends IBaseBusiness<IWolf> {
	public getByPack(name: string): Array<string> ;
}
