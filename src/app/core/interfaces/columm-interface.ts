import { ITodo } from "./todo-interface";

export interface IColumn {
    id:number;
    id_board:number;
    title:string;
    tasks?:ITodo[]
}

export interface IColumnModal {
    id:number;
    id_board:number;
    title:string;
    titleModal:string;
    edit:boolean
}

export interface IColumnState {
    columns:IColumn[];
    loading:boolean;
    error?:string
}
