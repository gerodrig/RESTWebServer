
interface ICreateHabitDto {
    id: number,
    userName:string,
    title:string,
    description:string,
}

export class UpdatedHabitDto {

    constructor(
        public readonly id: number,
        public readonly userName?:string,
        public readonly title?:string,
        public readonly description?:string,
    ){}

    get values(){
        const returnObj: ICreateHabitDto = {} as ICreateHabitDto;

        if(this.userName) returnObj.userName = this.userName;
        if(this.title) returnObj.title = this.title;
        if(this.description) returnObj.description = this.description;

        return returnObj;
    }
    
    static create(props: ICreateHabitDto): [string? , UpdatedHabitDto?] {

        const {id, userName, title, description} = props;

        if(!id || isNaN(id)) return [ 'Invalid id', undefined ];

        if(!userName || !title || !description) return [ 'Invalid data', undefined ];

        return [undefined, new UpdatedHabitDto(id, userName, title, description)];
    }
}



