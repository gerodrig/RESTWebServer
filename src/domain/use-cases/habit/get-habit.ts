import { HabitEntity } from '../../entities/habit.entity';
import { HabitRepository } from '../../repositories/habit.repository';


export interface GetHabitUseCase {
    execute(id: number): Promise<HabitEntity>;
}

export class GetHabit implements GetHabitUseCase {

    constructor(
        private readonly repository: HabitRepository
    ) {}
    execute(id: number): Promise<HabitEntity> {
        return this.repository.findOne(id);
    }
}