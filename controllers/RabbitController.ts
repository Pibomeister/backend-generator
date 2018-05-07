import { Request, Response } from 'express';

import { IBaseController } from './interfaces/base/BaseController';
import { IRabbit } from './../model/interfaces/IRabbit';
import { RabbitBusiness } from './../business/RabbitBusiness';

export class RabbitController implements IBaseController<RabbitBusiness> {

  public create(req: Request, res: Response): void {
    try {
      const Rabbit: IRabbit = <IRabbit>req.body;
      const RabbitBusiness = new RabbitBusiness();
      RabbitBusiness.create(Rabbit, (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({message: 'ERROR_CREATING[Rabbit]', error});
        } else {
          res.json({Rabbit: result});
        }
      });
    } catch (error) {
      console.error('Error creating Rabbit', error);
      res.status(400).json({message: 'ERROR_CREATING[Rabbit]', error});
    }
  }

  public update(req: Request, res: Response): void {
    try {
      const Rabbit: IRabbitModel = <IRabbitModel>req.body;
      const _id: string = req.params.id;
      const RabbitBusiness = new RabbitBusiness();
      RabbitBusiness.update(_id, Rabbit, (error, result) => {
        if (error) {
          res.status(500).json({message: 'ERROR_UPDATING[Rabbit]', error});
        }
        if (!result) {
          return res.status(404).json({
            message: 'NOT_FOUND[Rabbit]',
            error: new Error('Rabbit not found')
          });
        }
        res.json({Rabbit});
      });
    } catch (error) {
      console.error('Error updating Rabbit', error);
      res.status(400).json({message: 'ERROR_UPDATING[Rabbit]', error});
    }
  }

  public delete(req: Request, res: Response): void {
    try {
      const _id: string = req.params.id;
      const RabbitBusiness = new RabbitBusiness();
      RabbitBusiness.delete(_id, (error, result) => {
        if (error) {
            res.status(500).json({message: 'ERROR_DELETING[Rabbit]', error});
        } else {
            res.json({id: _id});
        }
      });
    } catch (error) {
      console.error('Error deleting Rabbit', error);
      res.status(500).json({message: 'ERROR_DELETING[Rabbit]', error});
    }
  }

  public retrieve(req: Request, res: Response): void {
    try {
        const RabbitBusiness = new RabbitBusiness();
        RabbitBusiness.retrieve((error, result) => {
            if (error) {
                res.status(500).json({message: 'ERROR_RETRIEVING[Rabbit]', error});
            } else {
                res.json({cellsites: result});
            }
        });
    } catch (error) {
        console.error('Error retrieving Rabbit', error);
        res.status(400).json({message: 'ERROR_RETRIEVING[Rabbit]', error});
    }
  }

  public findById(req: Request, res: Response): void {
    try {
      const _id: string = req.params.id;
      const RabbitBusiness = new RabbitBusiness();
      RabbitBusiness.findById(_id, (error, result) => {
        if (error) {
          return res.status(500).json({message: 'ERROR_GETTING[Rabbit', error});
        }
        if (!result) {
            return res.status(404).json({
              message: 'NOT_FOUND[Rabbit]', 
              error: new Error('Rabbit not found')
            });
        }
        res.json({Rabbit: result});
      });
    } catch (error) {
      console.error('Error getting Rabbit', error);
      return res.status(400).json({message: 'ERROR_GETTING[Rabbit', error});
    }
  }
}
