import { Request, Response } from 'express';

import { IBaseController } from './interfaces/base/BaseController';
import { IChicken } from './../model/interfaces/IChicken';
import { ChickenBusiness } from './../business/ChickenBusiness';

export class ChickenController implements IBaseController<ChickenBusiness> {

  public create(req: Request, res: Response): void {
    try {
      const chicken: IChicken = <IChicken>req.body;
      const chickenBusiness = new ChickenBusiness();
      chickenBusiness.create(chicken, (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({message: 'ERROR_CREATING[Chicken]', error});
        } else {
          res.json({chicken: result});
        }
      });
    } catch (error) {
      console.error('Error creating Chicken', error);
      res.status(400).json({message: 'ERROR_CREATING[Chicken]', error});
    }
  }

  public update(req: Request, res: Response): void {
    try {
      const chicken: IChicken = <IChicken>req.body;
      const _id: string = req.params.id;
      const chickenBusiness = new ChickenBusiness();
      chickenBusiness.update(_id, chicken, (error, result) => {
        if (error) {
          res.status(500).json({message: 'ERROR_UPDATING[Chicken]', error});
        }
        if (!result) {
          return res.status(404).json({
            message: 'NOT_FOUND[Chicken]',
            error: new Error('Chicken not found')
          });
        }
        res.json({chicken});
      });
    } catch (error) {
      console.error('Error updating Chicken', error);
      res.status(400).json({message: 'ERROR_UPDATING[Chicken]', error});
    }
  }

  public delete(req: Request, res: Response): void {
    try {
      const _id: string = req.params.id;
      const chickenBusiness = new ChickenBusiness();
      chickenBusiness.delete(_id, (error, result) => {
        if (error) {
            res.status(500).json({message: 'ERROR_DELETING[Chicken]', error});
        } else {
            res.json({id: _id});
        }
      });
    } catch (error) {
      console.error('Error deleting Chicken', error);
      res.status(500).json({message: 'ERROR_DELETING[Chicken]', error});
    }
  }

  public retrieve(req: Request, res: Response): void {
    try {
        const chickenBusiness = new ChickenBusiness();
        chickenBusiness.retrieve((error, result) => {
            if (error) {
                res.status(500).json({message: 'ERROR_RETRIEVING[Chicken]', error});
            } else {
                res.json({cellsites: result});
            }
        });
    } catch (error) {
        console.error('Error retrieving Chicken', error);
        res.status(400).json({message: 'ERROR_RETRIEVING[Chicken]', error});
    }
  }

  public findById(req: Request, res: Response): void {
    try {
      const _id: string = req.params.id;
      const chickenBusiness = new ChickenBusiness();
      chickenBusiness.findById(_id, (error, result) => {
        if (error) {
          return res.status(500).json({message: 'ERROR_GETTING[Chicken', error});
        }
        if (!result) {
            return res.status(404).json({
              message: 'NOT_FOUND[Chicken]', 
              error: new Error('Chicken not found')
            });
        }
        res.json({Chicken: result});
      });
    } catch (error) {
      console.error('Error getting Chicken', error);
      return res.status(400).json({message: 'ERROR_GETTING[Chicken', error});
    }
  }}
