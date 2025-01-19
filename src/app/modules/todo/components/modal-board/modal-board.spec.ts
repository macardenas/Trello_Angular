import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalBoardComponent } from './modal-board.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('modal-board.component', () => {
  let component: ModalBoardComponent;
  let fixture: ComponentFixture<ModalBoardComponent>;
  let dialogRef: MatDialogRef<ModalBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalBoardComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: { titleModal: 'Crear nueva tarea' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalBoardComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with title and description controls', () => {
    expect(component.formTodo.contains('title')).toBeTruthy();
    expect(component.formTodo.contains('description')).toBeTruthy();
    expect(component.formTodo.contains('img')).toBeTruthy();
  });

  it('should make the title control required', () => {
    const control = component.formTodo.get('title');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should display error message when title is empty and touched', () => {
    const control = component.formTodo.get('title');
    control?.setValue('');
    control?.markAsTouched();
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('mat-error'));
    expect(errorElement).toBeTruthy(); // Verifica que el elemento existe
    if (errorElement) {
      expect(errorElement.nativeElement.textContent).toContain('El título es obligatorio');
    }
  });

  it('should make the description control required', () => {
    const control = component.formTodo.get('description');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should display error message when title is empty and touched', () => { 
    const control = component.formTodo.get('title'); 
    control?.setValue(''); 
    control?.markAsTouched(); fixture.detectChanges(); 
    const errorElement = fixture.debugElement.query(By.css('mat-error')); 
    expect(errorElement).toBeTruthy(); // Verifica que el elemento de error existe antes de intentar acceder a él 
    if (errorElement) { 
        expect(errorElement.nativeElement.textContent).toContain('El título es obligatorio'); } 
    });

  it('should enable save button when form is valid and formChanged is true', () => {
    component.formChanged = true;
    component.formTodo.patchValue({
      title: 'Test Title',
      description: 'Test Description',
      img: ''
    });
    fixture.detectChanges();

    const saveButton = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
    expect(saveButton.disabled).toBeFalsy();
    expect(saveButton.classList).toContain('bg-green-500');
  });

  it('should disable save button when form is invalid', () => {
    component.formTodo.patchValue({
      title: '',
      description: 'Test Description',
      img: ''
    });
    fixture.detectChanges();

    const saveButton = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
    expect(saveButton.disabled).toBeTruthy();
    expect(saveButton.classList).toContain('bg-gray-500');
  });

  it('should call saveTodo on save button click when form is valid', () => {
    spyOn(component, 'saveTodo');
    component.formTodo.patchValue({
      title: 'Test Title',
      description: 'Test Description',
      img: ''
    });
    component.formChanged = true;
    fixture.detectChanges();

    const saveButton = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
    saveButton.click();
    expect(component.saveTodo).toHaveBeenCalled();
  });

  it('should close the dialog on close button click', () => {
    const closeButton = fixture.debugElement.query(By.css('button[mat-dialog-close]')).nativeElement;
    closeButton.click();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
