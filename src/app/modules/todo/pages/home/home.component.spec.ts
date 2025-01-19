import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IBoard } from 'src/app/core/interfaces/board-interface';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { createBoardRequest } from 'src/app/state/actions/board-action';
import { BoardComponent } from '../../components/board/board.component';
import { RouterModule } from '@angular/router';

describe('home.component', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let store: MockStore;
    let dialog: MatDialog;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomeComponent, BoardComponent],
            imports: [ NoopAnimationsModule, RouterModule.forRoot([]) ], 
            providers: [ provideMockStore(), { 
                provide: MatDialog, useValue: {
                     open: () => ({ afterClosed: () => of(true) }) 
            } } ]
        })
            .compileComponents();
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        dialog = TestBed.inject(MatDialog);
        store = TestBed.inject(MockStore);
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
    //Test de integracion
    it('should open the dialog and dispatch create action when confirmed', () => { 
        const newBoard: IBoard = { id: 1, title: 'New Board', description:'Test unitario',img: undefined }; 
        spyOn(store, 'dispatch'); 
        spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(newBoard) } as MatDialogRef<typeof HomeComponent>);
        component.createBoard(); expect(dialog.open).toHaveBeenCalled(); 
        expect(store.dispatch).toHaveBeenCalledWith(createBoardRequest({ board: newBoard })); 
    });
    //Test de integracion
    it('should not dispatch create action if dialog is dismissed', () => { 
        spyOn(store, 'dispatch'); 
        spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(null) } as MatDialogRef<typeof HomeComponent>); 
        component.createBoard(); 
        expect(dialog.open).toHaveBeenCalled(); 
        expect(store.dispatch).not.toHaveBeenCalled(); 
    });

});