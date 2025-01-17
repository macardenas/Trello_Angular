import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { createTodoRequest, createTodoSuccess, getTodosRequest, getTodosSuccess, todosError } from '../actions/todo-actions';
import { GeneralService } from 'src/app/services/general.service';

@Injectable()
export class TodosEffects {

    createTodo$ = createEffect(() => this.actions$.pipe(
        ofType(createTodoRequest), // Se escucha la acción createTodoRequest y esto desencadena el flujo
        //exhaustMap evita las peticiones duplicadas
        exhaustMap((action) =>  //Las action son los datos que se envían en la acción
            this.todoService.createTodo(action.todo) // Se envía el todo proveniente de la acción al servicio
            .pipe(
                map((resp: any) => {
                    // Se retorna la acción createTodoSuccess con el TODO creado por un payload
                   
                    console.log(resp);
                    return createTodoSuccess({ todo:  {
                        _id: "1",
                        title: "Ejemplo",
                        description: "Esto es una simulacion",
                        status:{
                            _id: 1,
                            name:"TESTNAME"
                        } 
                      } })
                }),
                catchError(() => {
                    // Se retorna la acción todosError con un error en caso de que la petición falle
                    this.generalService.openDialogGeneric('Error al crear el TODO', 'fa-solid fa-xmark', 'text-red-500')
                    return [todosError({ error: 'Error al crear el TODO' })]
                })
            )
        )
    ))

    loadTodos$ = createEffect(() => this.actions$.pipe(
        ofType(getTodosRequest), // Se escucha la acción getTodosRequest y esto desencadena el flujo
        //exhaustMap evita las peticiones duplicadas
        exhaustMap(() => 
            this.todoService.getTodos() // Se obtienen los TODOS
                .pipe( // se tratan los datos obtenidos
                    map((resp: any) => {
                        // Se retorna la acción getTodosSuccess con los TODOS obtenidos
                        console.log("Me llamo de nuevo");
                        console.log(resp);
                        return getTodosSuccess({ todos: [{
                            _id: "1",
                            title: "Ejemplo",
                            description: "Esto es una simulacion",
                            status:{
                                _id: 1,
                                name:"TESTNAME"
                            } 
                          }] })
                    }),
                    catchError((err) => {
                        this.generalService.openDialogGeneric('Error al obtener los TODOS', 'fa-solid fa-xmark', 'text-red-500')
                        // Se retorna la acción getTodosError con un error en caso de que la petición falle
                        return [todosError({ error: 'Error al obtener los TODOS' })]
                    })
                )
        )
    ))

    constructor(
        private actions$: Actions,
        private todoService: TodoService,
        private generalService: GeneralService
    ) { }
}