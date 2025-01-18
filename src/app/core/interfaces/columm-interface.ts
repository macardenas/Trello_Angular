export interface IColumn {
    id:number;
    id_board:number;
    title:string;
}

export interface IColumnModal {
    id:number;
    id_board:number;
    title:string;
    edit:boolean
}

export interface IColumnState {
    columns:IColumn[];
    loading:boolean;
    error?:string
}
