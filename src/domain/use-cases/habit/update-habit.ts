import { HabitEntity } from '../../entities/habit.entity';
import { UpdatedHabitDto } from '../../dtos';
import { HabitRepository } from '../../repositories/habit.repository';


export interface UpdateHabitUseCase {
    execute(dto: UpdatedHabitDto): Promise<HabitEntity>;
}

export class updateHabit implements UpdateHabitUseCase {

    constructor(
        private readonly repository: HabitRepository
    ) {}
    execute(dto: UpdatedHabitDto): Promise<HabitEntity> {
        return this.repository.updateOne(dto);
    }
}