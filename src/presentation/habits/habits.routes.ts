import { Router } from "express";
import { HabitsController } from "./habits.controller";
import { HabitDatasourceImplementation } from '../../infrastructure/datasource/habit.datasource.implementation';
import { HabitRepositoryImplementation } from '../../infrastructure/repositories/habit.repository.implementation';


export class HabitsRoutes {

    static get routes(): Router {

        const router = Router();

        //create datasource and repository implementation
        const datasource = new HabitDatasourceImplementation();
        const habitRepository = new HabitRepositoryImplementation(datasource);

        const habitController = new HabitsController(habitRepository);

        router.get('/', habitController.getHabits);
        router.get('/:id', habitController.getHabitById);

        router.post('/', habitController.createHabit);
        router.put('/:id', habitController.updateHabit);
        router.delete('/:id', habitController.deleteHabit);

        return router;
    }
}