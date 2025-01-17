import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SigningService } from 'src/app/services/signing.service';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss']
})
export class SigningComponent implements OnInit {
  @ViewChild('formsigning')
  formsigning!: NgForm; 
  NotFound: boolean = false;
  
  constructor(private _signinservice: SigningService) { }

  ngOnInit(): void {
  }

  //Recibe los datos del formulario
  formsend(form: NgForm){
    try {
      this.NotFound = false;
      let UserFound = this._signinservice.CompareCredentials(form.value);
      console.log(UserFound);
      //TODO: llevar los daotosdd al localstorage
    } catch (error) {
      //Alerto que el usuario no existe
      this.NotFound = true;
      console.error(error);
    }
  }

}
