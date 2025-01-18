import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

// Selector para obtener el estado de los todos
export const selectTodoState = (state: AppState) => state.todos;


// Selector para obtener los todos pendientes
export const selectTodosColumns = (BoardID: number) =>
    createSelector(
        selectTodoState, // Selecciona el estado de los todos
        (state) => state.todos.filter(todo => todo.id_board === BoardID)
    );

// Selector para obtener el estado de error
export const selectError = createSelector(
    selectTodoState, // Selecciona el estado de los todos
    // Función que devuelve la propiedad `error` del estado de los todos
    (state) => state.error
);