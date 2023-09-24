import {
  CreateHabitDto,
  HabitEntity,
  HabitRepository,
  HabitDatasource,
  UpdatedHabitDto,
} from '../../domain/';

export class HabitRepositoryImplementation implements HabitRepository {
  constructor(private readonly habitDatasource: HabitDatasource) {}
  create(createHabitDto: CreateHabitDto): Promise<HabitEntity> {
    return this.habitDatasource.create(createHabitDto);
  }
  findAll(): Promise<HabitEntity[]> {
    return this.habitDatasource.findAll();
  }
  findOne(id: number): Promise<HabitEntity> {

    return this.habitDatasource.findOne(id);
  }
  updateOne(updateHabitDto: UpdatedHabitDto): Promise<HabitEntity> {
    return this.habitDatasource.updateOne(updateHabitDto);
  }
  deleteOne(id: number): Promise<HabitEntity> {
    return this.habitDatasource.deleteOne(id);
  }
}
