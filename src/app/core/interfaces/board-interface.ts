import { IColumn } from "./columm-interface";

export interface IBoard {
    id:number
    title:string;
    description:string;
}

export interface IBoardModal {
    id:number;
    title:string;
    description:string;
    edit:boolean
    titleModal:string
}

export interface IBoardState {
    boards:IBoard[];
    loading:boolean;
    error?:string
}

export interface IBoardExport extends IBoard {
    columns: IColumn[]
}