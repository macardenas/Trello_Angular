import { createAction, props } from "@ngrx/store";
import { IBoard } from "src/app/core/interfaces/board-interface";

// Accion para crear un board
export const createBoardRequest = createAction(
    "[Board] Create Board Request",  // Identificador del tipo de acción
    props<{ board: IBoard }>()   // Carga útil que contiene los datos necesarios para crear un nuevo board
)

// Acción para iniciar la obtención de todos los elementos board
export const getBoardsRequest = createAction(
    "[Board] Get Boards Request"  // Identificador del tipo de acción
);

//Accion para actualizar el board
export const updateBoardRequest = createAction(
    "[Board] Update Board Request",  // Identificador del tipo de acción
    props<{ board: IBoard }>()   // Carga útil que contiene los datos necesarios para actualizar el board
)

//Accion para borrar el board
export const deleteBoardRequest = createAction(
    "[Board] Delete Board Request",  // Identificador del tipo de acción
    props<{ board: IBoard }>()   // Carga útil que contiene los datos necesarios para eliminar el board
)

// Acción para manejar errores que ocurran durante la obtención de elementos todo
export const BoardsError = createAction(
    "[Board] Get Boards Error",    // Identificador del tipo de acción
    props<{ error: string }>()    // Carga útil que contiene el mensaje de error
)