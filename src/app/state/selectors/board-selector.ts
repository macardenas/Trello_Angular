import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";


// Selector para obtener el estado de los board
export const selectBoardState = (state: AppState) => state.boards;
export const selectColumnState = (state: AppState) => state.columns;
export const selectTaskState = (state: AppState) => state.todos;

export const selectAllBoard = createSelector(
    selectBoardState, // Selecciona el estado de los board
    (state) => state.boards
)

// selector with param
export const selectBoardById = (BoardID: number) =>
    createSelector(
        selectBoardState, // Selecciona el estado de los board
        (state) => state.boards.filter(item => item.id == BoardID)
    )

// selector with param Column
export const selectColumnBoardById = (BoardID: number) =>
    createSelector(
        selectColumnState, // Selecciona el estado de los board
        (state) => state.columns.filter(item => item.id_board == BoardID)
    )

// selector with param Todo
export const selectTodoBoardById = (BoardID: number) =>
    createSelector(
        selectTaskState, // Selecciona el estado de los board
        (state) => state.todos.filter(item => item.id_board == BoardID)
    )
