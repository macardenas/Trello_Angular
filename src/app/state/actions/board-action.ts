import { createAction, props } from "@ngrx/store";
import { IBoard } from "src/app/core/interfaces/board-interface";


export const createBoardRequest = createAction(
    "[Board] Create Board Request",  // Identificador del tipo de acción
    props<{ board: IBoard }>()   // Carga útil que contiene los datos necesarios para crear un nuevo board
)

// Acción para iniciar la obtención de todos los elementos board
export const getBoardsRequest = createAction(
    "[Board] Get Boards Request"  // Identificador del tipo de acción
);

// Acción para manejar errores que ocurran durante la obtención de elementos todo
export const BoardsError = createAction(
    "[Board] Get Boards Error",    // Identificador del tipo de acción
    props<{ error: string }>()    // Carga útil que contiene el mensaje de error
)