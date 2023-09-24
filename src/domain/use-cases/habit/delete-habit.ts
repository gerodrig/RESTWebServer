import { HabitEntity } from '../../entities/habit.entity';
import { HabitRepository } from '../../repositories/habit.repository';


export interface DeleteHabitUseCase {
    execute(id: number): Promise<HabitEntity>;
}

export class DeleteHabit implements DeleteHabitUseCase {

    constructor(
        private readonly repository: HabitRepository
    ) {}
    execute(id: number): Promise<HabitEntity> {
        return this.repository.deleteOne(id);
    }
}