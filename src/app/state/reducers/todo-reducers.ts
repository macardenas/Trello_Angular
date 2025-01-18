import { createReducer, on } from "@ngrx/store";
import { createTodoRequest, getTodosRequest, updateTodoRequest, deleteTodoRequest, todosError, } from "../actions/todo-actions";
import { TodoState } from "src/app/core/interfaces/todo-state";
import { ITodoState } from "src/app/core/interfaces/todo-interface";

export const initialState: ITodoState = {
    todos: [],
    loading: false,
    error: ''
};

export const _todoReducer = createReducer(
    initialState,
    on(createTodoRequest, (state, { todo }) => {
        //Genero un id para los todos
        const idrandom = Math.floor(Math.random() * 20001) + 20000;
        const columnnewstate = { ...todo, id:idrandom}
        return {
            todos: [...state.todos || [], columnnewstate],
            loading: false
        }
    }),

    on(getTodosRequest, (state) => ({
        todos:[...state.todos], // Se regresa el mismo estado
        loading: false // Se cambia el estado para indicar que se están cargando los TODOS desde la API
    })),

    on(updateTodoRequest, (state, { todo }) => {
        //Busco el id y lo reemplazo por el nuevo
        const index = state.todos.findIndex(item => item.id == todo.id)
        let newstate = [...state.todos];
        if(index != -1) newstate[index] = todo;

        return {
            todos: [...newstate],
            loading: false // Se cambia el estado para indicar que se terminó de cargar los TODOS desde la API
        }
    }),
    on(deleteTodoRequest, (state,{ todo }) => {

        const newstate = state.todos.filter(item => item.id !== todo.id); //Filtro todos menos el seleccionado para eliminar

        return {
            todos: [...newstate], // Se agrega el TODO creado al arreglo de TODOS
            loading: false
        }
    }),
    on(todosError, (state, { error }) => ({
        ...state, // Se regresa el mismo estado
        error, // Se actualiza el estado con el error
        loading: false // Se cambia el estado para indicar que se terminó de cargar los TODOS desde la API
    }))
)