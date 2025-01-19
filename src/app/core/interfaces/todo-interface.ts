export interface Todo {
    _id: string,
    title: string,
    description?: string,
    status: Status,
}

export interface Status {
    _id: number,
    name: string
}

export interface CreateTodo{
    title: string,
    description?: string,
    statusId: number
}


export interface UpdateTodo{
    title?: string,
    description?: string,
    statusId?: number
}

export interface ITodo{
    id: number,
    id_board:number,
    id_column:number
    title: string,
    description?: string,
}

export interface ITodoModal {
    id:number;
    id_column:number;
    id_column_new?:number;
    id_board:number;
    title:string;
    description?: string;
    edit?:boolean;
    titleModal?:string
}

export interface ITodoState {
    todos:ITodo[];
    loading:boolean;
    error?:string
}
