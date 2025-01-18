export interface IBoard {
    id:number
    title:string;
    description:string;
    img?:string;
}

export interface IBoardModal {
    id:number;
    title:string;
    description:string;
    img?:string;
    edit:boolean
    titleModal:string
}

export interface IBoardState {
    boards:IBoard[];
    loading:boolean;
    error?:string
}