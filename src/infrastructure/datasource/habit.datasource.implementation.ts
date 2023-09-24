import {
  HabitDatasource,
  HabitEntity,
  CreateHabitDto,
  UpdatedHabitDto,
} from '../../domain/';
import { prisma } from '../../data/postgres/';
import { CustomError } from '../../domain/errors/custom.error';

export class HabitDatasourceImplementation implements HabitDatasource {
  async create(createHabitDto: CreateHabitDto): Promise<HabitEntity> {

    if(!createHabitDto.userName || !createHabitDto.title || !createHabitDto.description) throw new CustomError('Missing fields', 400);

    const habit = await prisma.habit.create({
      data: createHabitDto,
    });

    return HabitEntity.fromObject(habit);
  }
  async findAll(): Promise<HabitEntity[]> {
    const habits = await prisma.habit.findMany();

    return habits.map((habit) => HabitEntity.fromObject(habit));
  }
  async findOne(id: number): Promise<HabitEntity> {
    const habit = await prisma.habit.findFirst({
      where: { id },
    });

    if (!habit) throw new CustomError(`Habit with id ${id} not found`, 404);
    console.log(habit);

    return HabitEntity.fromObject(habit);
  }
  async updateOne(updateHabitDto: UpdatedHabitDto): Promise<HabitEntity> {
    const habit = await prisma.habit.findFirst({
      where: { id: updateHabitDto.id },
    });


    if (!habit) throw new CustomError(`Habit with id ${updateHabitDto.id} not found`, 404);

    const updatedHabit = await prisma.habit.update({
        where: { id: updateHabitDto.id },
        data: updateHabitDto
    });

    const test =  HabitEntity.fromObject(updatedHabit);
    return HabitEntity.fromObject(updatedHabit);
  }
  async deleteOne(id: number): Promise<HabitEntity> {
    await this.findOne(id);
    const deletedHabit = await prisma.habit.delete({
        where: { id }
    });

    return HabitEntity.fromObject(deletedHabit);
  }
}
