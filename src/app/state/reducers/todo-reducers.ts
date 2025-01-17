import { createReducer, on } from "@ngrx/store";
import { createTodoRequest, createTodoSuccess, getTodosRequest, getTodosSuccess, todosError,} from "../actions/todo-actions";
import { TodoState } from "src/app/core/interfaces/todo-state";

export const initialState: TodoState = {
    todos: [],
    loading: false,
    error: ''
};

export const _todoReducer = createReducer(
    initialState,
    on(createTodoRequest, (state) => {
        let todostemp = state.todos.length>0 ? state.todos : [];
        return {
            ...state,
            loading: true
        }

    }
),

    on(createTodoSuccess, (state, { todo }  ) => {
        let todostemp = state.todos.length>0 ? state.todos : [];
        return { 
            ...state,
            todos: [...todostemp,todo], // Se agrega el TODO creado al arreglo de TODOS
            loading: false
        }
    }),

    on(getTodosRequest, (state) => ({
        ...state, // Se regresa el mismo estado
        loading: true // Se cambia el estado para indicar que se están cargando los TODOS desde la API
    })),

    on(getTodosSuccess, (state, { todos }) => ({
        ...state, // Se regresa el mismo estado
        todos, // Se actualiza el estado con los TODOS obtenidos
        loading: false // Se cambia el estado para indicar que se terminó de cargar los TODOS desde la API
    })),
    on(todosError, (state, { error }) => ({
        ...state, // Se regresa el mismo estado
        error, // Se actualiza el estado con el error
        loading: false // Se cambia el estado para indicar que se terminó de cargar los TODOS desde la API
    }))
)