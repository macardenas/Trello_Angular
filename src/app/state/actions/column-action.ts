import { createAction, props } from "@ngrx/store";
import { IColumn } from "src/app/core/interfaces/columm-interface";

export const createColumnRequest = createAction(
    "[Column] Create Column Request",  // Identificador del tipo de acción
    props<{ column: IColumn }>()   // Carga útil que contiene los datos necesarios para crear un nuevo column
)

export const updateColumnRequest = createAction(
    "[Column] Update Column Request",  // Identificador del tipo de acción
    props<{ column: IColumn }>()   // Carga útil que contiene los datos necesarios para crear un nuevo column
)

export const getColumnsRequest = createAction(
    "[Column] Get Columns Request"  // Identificador del tipo de acción
);

export const deleteColumnRequest = createAction(
    "[Column] Delete Column Request",  // Identificador del tipo de acción
    props<{ column: IColumn }>()   // Carga útil que contiene los datos necesarios para eliminar la columna
)
