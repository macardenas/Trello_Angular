import { createAction, props } from "@ngrx/store";
import { CreateTodo, ITodo, Todo } from "src/app/core/interfaces/todo-interface";

// Acción para iniciar la obtención de todos los elementos todo
export const getTodosRequest = createAction(
    "[Todo] Get Todos Request"  // Identificador del tipo de acción
);

// Acción para iniciar la creación de un nuevo elemento todo
export const createTodoRequest = createAction(
    "[Todo] Create Todo Request",  // Identificador del tipo de acción
    props<{ todo: ITodo }>()   // Carga útil que contiene los datos necesarios para crear un nuevo todo
)

// Accion para actualizar un todo
export const updateTodoRequest = createAction(
    "[Todo] Update Todo Request",  // Identificador del tipo de acción
    props<{ todo: ITodo }>()   // Carga útil que contiene los datos necesarios para crear un nuevo todo
)

//Accion para eliminar un todo
export const deleteTodoRequest = createAction(
    "[Todo] Delete Todo Request",  // Identificador del tipo de acción
    props<{ todo: ITodo }>()   // Carga útil que contiene los datos necesarios para crear un nuevo todo
)

// Acción para manejar errores que ocurran durante la obtención de elementos todo
export const todosError = createAction(
    "[Todo] Get Todos Error",    // Identificador del tipo de acción
    props<{ error: string }>()    // Carga útil que contiene el mensaje de error
)