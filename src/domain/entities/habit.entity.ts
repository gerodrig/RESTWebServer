

export class HabitEntity {

    constructor(
        private readonly id: number,
        private readonly userName: string,
        private readonly title: string,
        private readonly description: string,
        private readonly isActive: boolean,
    ) {}

    get isHabitActive(): boolean {
        return this.isActive;
    }

    public static fromObject = (object: any): HabitEntity => {
        const { id, userName, title, description, isActive = 'true' } = object;

        if(!id) throw new Error('Habit id is required');
        if(!userName) throw new Error('Habit userName is required');
        if(!title) throw new Error('Habit title is required');
        if(!description) throw new Error('Habit description is required');

        return new HabitEntity(id, userName, title, description, isActive);

    };


}