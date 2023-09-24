import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';

const SECONDS = 1000;
jest.setTimeout(70 * SECONDS);

describe('Habit route testing', () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  beforeEach(async () => {
    await prisma.habit.deleteMany();
  });

  const habit1 = {
    title: 'Habit 1',
    description: 'Description 1',
    userName: 'User 1',
  };

  const habit2 = {
    title: 'Habit 2',
    description: 'Description 2',
    userName: 'User 2',
  };

  test('should return Habits api/habits', async () => {
    //delete all entries before testing
    await prisma.habit.deleteMany();
    // create two habits
    await prisma.habit.createMany({
      data: [habit1, habit2],
    });

    const { body } = await request(testServer.app)
      .get('/api/habits')
      .expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].title).toBe(habit1.title);
    expect(body[1].title).toBe(habit2.title);
    [];
  });

  test('should return a Habit api/habits/:id', async () => {
    const habit = await prisma.habit.create({
      data: habit1,
    });

    const { body } = await request(testServer.app)
      .get(`/api/habits/${habit.id}`)
      .expect(200);

    expect(body).toEqual({
      id: habit.id,
      userName: habit.userName,
      title: habit.title,
      description: habit.description,
      isActive: habit.isActive,
    });
  });

  test('should return error when id is not found api/habits/:id', async () => {
    const habitId = 999;

    const { body } = await request(testServer.app)
      .get(`/api/habits/${habitId}`)
      .expect(404);

    expect(body).toEqual({
      error: `Habit with id ${habitId} not found`,
    });
  });

  test('should create a Habit api/habits', async () => {
    const { body } = await request(testServer.app)
      .post('/api/habits')
      .send(habit1)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(Number),
      userName: habit1.userName,
      title: habit1.title,
      description: habit1.description,
      isActive: true,
    });
  });

  test('should throw an error if username is not present when creating Habit api/habits', async () => {
    const copyHabit1 = {
      title: habit1.title,
      description: habit1.description,
    };

    const { body } = await request(testServer.app)
      .post('/api/habits')
      .send(copyHabit1)
      .expect(400);

    expect(body).toEqual({
      error: 'Missing fields',
    });
  });

  test('should return an updated habit api/habits/:id', async () => {
    const habit = await prisma.habit.create({ data: habit1 });

    const updatedHabit = {
      userName: 'Updated User',
      title: 'Updated Title',
      description: 'Updated Description',
    };

    const { body } = await request(testServer.app)
      .put(`/api/habits/${habit.id}`)
      .send(updatedHabit)
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      userName: updatedHabit.userName,
      title: updatedHabit.title,
      description: updatedHabit.description,
      isActive: habit.isActive,
    });
  });

  test('should return an updated habit api/habits/:id where only username is updated', async () => {
    const habit = await prisma.habit.create({ data: habit1 });

    const updatedHabit = {
      userName: 'Benito',
    };

    const { body } = await request(testServer.app)
      .put(`/api/habits/${habit.id}`)
      .send(updatedHabit)
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      userName: updatedHabit.userName,
      title: habit.title,
      description: habit.description,
      isActive: habit.isActive,
    });
  });

  test('should throw an error if id is not found when updating Habit api/habits/:id', async () => {
    const habitId = 999;
    const habit = await prisma.habit.create({ data: habit1 });

    const updatedHabit = {
      userName: 'Benito',
    };

    const { body } = await request(testServer.app)
      .put(`/api/habits/${habitId}`)
      .send(updatedHabit)
      .expect(404);

    expect(body).toEqual({
      error: `Habit with id ${habitId} not found`,
    });
  });

  test('should delete a Habit api/habits/:id', async () => {
    const habit = await prisma.habit.create({ data: habit1 });

    const { body } = await request(testServer.app)
      .delete(`/api/habits/${habit.id}`)
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      userName: habit.userName,
      title: habit.title,
      description: habit.description,
      isActive: habit.isActive,
    });
  });

  test('should throw an error if id is not found when deleting Habit api/habits/:id', async () => {
    const habitId = 999;

    const { body } = await request(testServer.app)
      .delete(`/api/habits/${habitId}`)
      .expect(404);

    expect(body).toEqual({
      error: `Habit with id ${habitId} not found`,
    });
  });
});
