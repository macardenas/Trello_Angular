import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { IColumn } from '../../../../core/interfaces/columm-interface';
import { ITodo } from '../../../../core/interfaces/todo-interface';
import { createTodoRequest } from 'src/app/state/actions/todo-actions';

describe('todo-item.component', () => {
    let component: TodoItemComponent;
    let fixture: ComponentFixture<TodoItemComponent>;
    let store: MockStore;
    let dialog: MatDialog;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TodoItemComponent],
            imports: [ NoopAnimationsModule ], 
            providers: [ provideMockStore(), { 
                provide: MatDialog, useValue: {
                     open: () => ({ afterClosed: () => of(true) }) 
            } } ]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TodoItemComponent);
        component = fixture.componentInstance;
        dialog = TestBed.inject(MatDialog);
        store = TestBed.inject(MockStore);
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should have an empty searchTerm on initialization', () => { 
        expect(component.searchTerm).toBe(''); 
    });
    //Test de integracion
    it('should open the dialog and dispatch create action when confirmed', () => { 
        const column: IColumn = { id: 1, id_board: 1, title: 'Test Column' }; 
        const newTodo: ITodo = { id: 1, title: 'New Todo', id_column: column.id, id_board:column.id_board }; 
        spyOn(store, 'dispatch');
        spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(newTodo) } as MatDialogRef<typeof component>); 
        component.createTodo(column); 
        expect(dialog.open).toHaveBeenCalled(); 
        expect(store.dispatch).toHaveBeenCalledWith(createTodoRequest({ todo: newTodo })); 
    });
    //Test de integracion
    it('should not dispatch create action if dialog is dismissed', () => { 
        const column: IColumn = { id: 1, id_board: 1, title: 'Test Column' }; 
        spyOn(store, 'dispatch'); 
        spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(null) } as MatDialogRef<typeof component>); 
        component.createTodo(column); 
        expect(dialog.open).toHaveBeenCalled(); 
        expect(store.dispatch).not.toHaveBeenCalled(); 
    });

});