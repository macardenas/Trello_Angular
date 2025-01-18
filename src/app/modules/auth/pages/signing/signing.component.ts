import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserSigning } from 'src/app/core/interfaces/signing-interface';
import { SigningService } from 'src/app/services/signing.service';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss']
})
export class SigningComponent { 
  NotFound: boolean = false;
  DataUser: IUserSigning[] | undefined;
  
  constructor(private _signinservice: SigningService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  //Recibe los datos del formulario
  formsend(form: NgForm){
    try {
      //Comparo las credenciales
      this._signinservice.CompareCredentials(form.value);
      //Notifico que si encontre al usuario
      this.NotFound = false;
      this.router.navigate(['../todo']);
    } catch (error) {
      //Alerto que el usuario no existe
      this.NotFound = true;
      console.error(error);
    }
  }

}
