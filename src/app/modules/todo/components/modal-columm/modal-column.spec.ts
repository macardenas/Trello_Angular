import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalColummComponent } from './modal-columm.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('modal-colum.component', () => {
  let component: ModalColummComponent;
  let fixture: ComponentFixture<ModalColummComponent>;
  let dialogRef: MatDialogRef<ModalColummComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalColummComponent],
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
        { provide: MAT_DIALOG_DATA, useValue: { titleModal: 'Crear nuevo tablero' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalColummComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with title control', () => {
    expect(component.formTodo.contains('title')).toBeTruthy();
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

    const errorElement = fixture.debugElement.query(By.css('mat-error')).nativeElement;
    expect(errorElement.textContent).toContain('El título es obligatorio');
  });

  it('should enable save button when form is valid and formChanged is true', () => {
    component.formChanged = true;
    component.formTodo.patchValue({
      title: 'Test Title'
    });
    fixture.detectChanges();

    const saveButton = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
    expect(saveButton.disabled).toBeFalsy();
    expect(saveButton.classList).toContain('bg-green-500');
  });

  it('should disable save button when form is invalid', () => {
    component.formTodo.patchValue({
      title: ''
    });
    fixture.detectChanges();

    const saveButton = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
    expect(saveButton.disabled).toBeTruthy();
    expect(saveButton.classList).toContain('bg-gray-500');
  });

  it('should call saveTodo on save button click when form is valid', () => {
    spyOn(component, 'saveTodo');
    component.formTodo.patchValue({
      title: 'Test Title'
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
