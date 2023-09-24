import { Request, Response } from 'express';
import { CreateHabitDto, UpdatedHabitDto, HabitRepository } from '../../domain';

export class HabitsController {
  //* DI
  constructor(private readonly habitRepository: HabitRepository) {}

  public getHabits = async (req: Request, res: Response) => {
    const habits = await this.habitRepository.findAll();

    return res.json(habits);
  };

  public getHabitById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
      const habit = await this.habitRepository.findOne(id);
      res.json(habit);
    } catch (error: any) {
      res.status(404).json({ error: error.message }); // Return the error message instead of an empty object
    }
  };

  public createHabit = async (req: Request, res: Response) => {
    const [error, createHabitDto] = CreateHabitDto.create(req.body);
    if (error) return res.status(400).json({ error: error });

    //create habit
    const habit = await this.habitRepository.create(createHabitDto!);

    res.json(habit);
  };

  public updateHabit = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdatedHabitDto.create({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    const updatedHabit = await this.habitRepository.updateOne(updateTodoDto!);

    return res.json(updatedHabit);
  };

  public deleteHabit = async (req: Request, res: Response) => {
    const id = +req.params.id;
    
    const deletedHabit = await this.habitRepository.deleteOne(id);

    res.json(deletedHabit);
  };
}
