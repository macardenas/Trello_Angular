import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";


// Selector para obtener el estado de los column
export const selectColumnState = (state: AppState) => state.columns;

// selector with param para buscar las columnas que le pertenece a un tablero
export const selectColumndById = (BoardID: number) =>
    createSelector(
        selectColumnState, // Selecciona el estado de los board
        (state) => state.columns.filter(item => item.id_board == BoardID)
    )
