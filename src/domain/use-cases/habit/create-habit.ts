import { HabitEntity } from '../../entities/habit.entity';
import { CreateHabitDto } from '../../dtos';
import { HabitRepository } from '../../repositories/habit.repository';


export interface CreateHabitUseCase {
    execute(dto: CreateHabitDto): Promise<HabitEntity>;
}

export class CreateHabit implements CreateHabitUseCase {

    constructor(
        private readonly repository: HabitRepository
    ) {}
    execute(dto: CreateHabitDto): Promise<HabitEntity> {
        return this.repository.create(dto);
    }
}