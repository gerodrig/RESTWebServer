import { HabitEntity } from "../entities/habit.entity";
import { CreateHabitDto, UpdatedHabitDto } from '../dtos';

export abstract class HabitDatasource {

    abstract create(createHabitDto: CreateHabitDto): Promise<HabitEntity>;
    
    //TODO: paginate
    abstract findAll(): Promise<HabitEntity[]>;

    abstract findOne(id: number): Promise<HabitEntity>;

    abstract updateOne(updateHabitDto: UpdatedHabitDto): Promise<HabitEntity>;

    abstract deleteOne(id: number): Promise<HabitEntity>;
}