import { ActionReducerMap } from "@ngrx/store";
import { IBoardState } from "../core/interfaces/board-interface";
import { _todoReducer } from "./reducers/todo-reducers";
import { _boardreducer } from "./reducers/board-reducers";
import { IColumnState } from "../core/interfaces/columm-interface";
import { _columnreducer } from "./reducers/column-reducers";
import { ITodoState } from "../core/interfaces/todo-interface";

export interface AppState {
    todos: ITodoState,
    boards: IBoardState
    columns: IColumnState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    todos: _todoReducer,
    boards: _boardreducer,
    columns: _columnreducer
};
