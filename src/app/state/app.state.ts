import { ActionReducerMap } from "@ngrx/store";
import { TodoState } from "../core/interfaces/todo-state";
import { IBoardState } from "../core/interfaces/board-interface";
import { _todoReducer } from "./reducers/todo-reducers";
import { _boardreducer } from "./reducers/board-reducers";

export interface AppState {
    todos: TodoState,
    boards: IBoardState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    todos: _todoReducer,
    boards: _boardreducer
};