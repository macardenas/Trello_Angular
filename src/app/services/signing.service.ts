import { Injectable } from '@angular/core';
import { IUserSigning } from '../core/interfaces/signing-interface';
import data from 'src/app/mock/login.json';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SigningService {

  private logginSubject = new BehaviorSubject<boolean>(false);
  DataUser: IUserSigning[] = []

  constructor(private router: Router, private route: ActivatedRoute) { }
  //Con esto le informo al guard si fue exitoso el iniciode sesion
  isLoggin(): Observable<boolean> { 
    return this.logginSubject.asObservable(); 
  }

  Rol(){
    return this.DataUser[0].rol
  }
  //Seteo el valor y aviso
  setLogginStatus(status: boolean): void { 
    this.logginSubject.next(status); 
  }
  //Comparo las credenciales ingresadas vs las de los usuarios
  CompareCredentials(dataInput: IUserSigning) {
    const dataComparate = data as IUserSigning[];
    const userFind = dataComparate.filter(user => user.username === dataInput.username && user.password === dataInput.password);

    if (userFind.length === 0) {
      this.setLogginStatus(false);
      throw new Error('User not found');
    }
    this.setLogginStatus(true);
    this.router.navigate([`../todo`], { relativeTo: this.route });
    this.DataUser = userFind;
    return userFind;
  }
}
