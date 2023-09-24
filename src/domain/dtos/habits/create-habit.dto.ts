
interface ICreateHabitDto {
    userName:string,
    title:string,
    description:string,
}

export class CreateHabitDto {

    constructor(
        public readonly userName:string,
        public readonly title:string,
        public readonly description:string,
    ){}

    get values(){
        const returnObj: ICreateHabitDto = {} as ICreateHabitDto;

        if(this.userName) returnObj.userName = this.userName;
        if(this.title) returnObj.title = this.title;
        if(this.description) returnObj.description = this.description;

        return returnObj;
    }
    
    static create(props: ICreateHabitDto): [string? , CreateHabitDto?] {

        const {userName, title, description} = props;

        if(!userName || !title || !description) throw new Error('Missing fields');

        return [undefined, new CreateHabitDto(userName, title, description)];
    }
}

