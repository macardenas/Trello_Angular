import { createReducer, on } from "@ngrx/store";
import { BoardsError,createBoardRequest,deleteBoardRequest,getBoardsRequest, updateBoardRequest } from "../actions/board-action";
import { IBoardState } from "src/app/core/interfaces/board-interface";

export const initialState: IBoardState = {
    boards: [],
    loading: false,
    error: ''
};

export const _boardreducer = createReducer(
    initialState,
    on(createBoardRequest, (state,{ board }) => {
        //Le asigno un id random para poder identificarlo
        const idrandom = Math.floor(Math.random() * 10000) + 1;
        const boardnewstate = { ...board, id:idrandom}
        return {
            boards:[...state?.boards || [],boardnewstate], //Agrego el nuevo board creado
            loading: false
        }
     }
    ),
    on(updateBoardRequest, (state,{ board }) => {
        //Busco el valor para actualizarlo
        const index = state.boards.findIndex(item => item.id == board.id)
        let newstate = [...state.boards];
        if(index!=-1) newstate[index] = board
        return {
            boards:[...newstate], //Agrego el nuevo board creado
            loading: false
        }
     }
    ),
    on(deleteBoardRequest, (state,{ board }) => {
        //Filtro todo menos el valor que se quiere eliminar
        let newstate = state.boards.filter(item => item.id != board.id)
        
        return {
            boards:[...newstate], //Agrego los board
            loading: false
        }
     }
    ),
    on(getBoardsRequest, (state) => {
        return {
            ...state, // Se agrega el TODO creado al arreglo de TODOS
            loading: false
        }
    }),
    on(BoardsError, (state, { error }) => ({
        ...state, // Se regresa el mismo estado
        error, // Se actualiza el estado con el error
        loading: false // Se cambia el estado para indicar que se terminó de cargar los BOARDS
    }))
)
