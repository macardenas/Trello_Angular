import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { IBoardModal } from 'src/app/core/interfaces/board-interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-board',
  templateUrl: './modal-board.component.html'
})
export class ModalBoardComponent implements OnInit {

  modeEdit: boolean = this.data.edit || false;
  formTodo: FormGroup = new FormGroup({})
  formChanged = false;
  fileUrl: SafeUrl | null = null;

  constructor(
    public dialogRef: MatDialogRef<ModalBoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBoardModal,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.formTodoGroup();
    this.trackFormChangesInEditMode();
  }

  formTodoGroup(): void {
    this.formTodo = new FormGroup({
      title: new FormControl(this.data?.title, [Validators.required]),
      description: new FormControl(this.data?.description, [Validators.required]),
      img: new FormControl(this.data?.img),
    });
  }

  trackFormChangesInEditMode(): void {
    if (this.modeEdit) {
      this.formTodo.valueChanges.subscribe((value) => {
        this.formChanged = (
          this.data.title !== value.title ||
          this.data.description !== value.description ||
          this.data.img !== value.img
        );
      });
    }
  }

  saveTodo(): void {
    console.log(this.formTodo.value);
    if (!this.formTodo.valid) return;
    this.dialogRef.close({ ...this.formTodo.value,img:this.fileUrl, id: this.data.id });
  }

  GetImg(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]; 
    if (file) { 
      const reader = new FileReader(); 
      reader.readAsDataURL(file); 
      // Crear una URL temporal y sanitizarla 
      this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)); 
    }
  }

}
