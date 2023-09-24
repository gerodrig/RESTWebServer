import { HabitEntity } from '../../entities/habit.entity';
import { HabitRepository } from '../../repositories/habit.repository';


export interface GetHabitsUseCase {
    execute(): Promise<HabitEntity[]>;
}

export class GetHabits implements GetHabitsUseCase {

    constructor(
        private readonly repository: HabitRepository
    ) {}
    execute(): Promise<HabitEntity[]> {
        return this.repository.findAll();
    }
}