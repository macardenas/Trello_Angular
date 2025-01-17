import { createReducer, on } from "@ngrx/store";
import { getColumnsRequest, createColumnRequest, deleteColumnRequest } from "../actions/column-action";
import { IColumnState } from "src/app/core/interfaces/columm-interface";

export const initialState: IColumnState = {
    columns: [],
    loading: false,
    error: ''
};

export const _columnreducer = createReducer(
    initialState,
    on(createColumnRequest, (state,{ column }) => {
        const idrandom = Math.floor(Math.random() * 10001) + 10000;
        const columnnewstate = { ...column, id:idrandom}
        return {
            columns:[...state?.columns || [],columnnewstate], // Se agrega el TODO creado al arreglo de TODOS
            loading: false
        }
    }),
    on(getColumnsRequest, (state) => {
        return {
            ...state, // Se agrega el TODO creado al arreglo de TODOS
            loading: false
        }
    }),
    on(deleteColumnRequest, (state, { column }) => {
        const newstate = state.columns.filter(item => item.id !== column.id)
        return {
            columns: [...newstate], // Se agrega el TODO creado al arreglo de TODOS
            loading: false
        }
    })
)
