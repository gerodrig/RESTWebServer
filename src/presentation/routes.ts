import { Router } from "express";
import { HabitsRoutes } from './habits/habits.routes';


export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/habits', HabitsRoutes.routes);

        return router;
    }
}