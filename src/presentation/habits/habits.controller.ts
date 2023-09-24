import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors/custom.error';
import {
  DeleteHabit,
  HabitRepository,
  GetHabits,
  GetHabit,
CreateHabit,
updateHabit,
} from '../../domain';

export class HabitsController {
  //* DI
  constructor(private readonly habitRepository: HabitRepository) {}

  private handleError = (res: Response, error: unknown) => {

    if(error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error - check logs' });
  }

  public getHabits = (req: Request, res: Response) => {
    new GetHabits(this.habitRepository)
      .execute()
      .then((habits) => res.json(habits))
      .catch((error) => this.handleError(res, error));
  };

  public getHabitById = (req: Request, res: Response) => {
    new GetHabit(this.habitRepository)
      .execute(+req.params.id)
      .then((habit) => res.json(habit))
      .catch((error) => this.handleError(res, error));
  };

  public createHabit = (req: Request, res: Response) => {
   
    new CreateHabit(this.habitRepository)
      .execute(req.body)
      .then((habit) => res.status(201).json(habit))
      .catch((error) => this.handleError(res, error));
  };

  public updateHabit = (req: Request, res: Response) => {
 
    new updateHabit(this.habitRepository)
      .execute({ ...req.body, id: +req.params.id })
      .then((habit) => res.json(habit))
      .catch((error) => this.handleError(res, error));
  };

  public deleteHabit = (req: Request, res: Response) => {
   
    new DeleteHabit(this.habitRepository)
      .execute(+req.params.id)
      .then((habit) => res.json(habit))
      .catch((error) => this.handleError(res, error));
  }
}
