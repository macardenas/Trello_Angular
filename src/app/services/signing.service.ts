import { Injectable } from '@angular/core';
import { IUserSigning } from '../core/interfaces/signing-interface';
import data from 'src/app/mock/login.json'

@Injectable({
  providedIn: 'root'
})
export class SigningService {

  constructor() { }

  //Comparo los datos entrantes vs los datos de demo
  CompareCredentials(DataInput:IUserSigning){
    //asigno el json del tipo que corresponde para mejor tipado
    let DataComparate = data as unknown as IUserSigning[]
    //Busco el usuario
    let UserFind = DataComparate.filter((user) => user.username == DataInput.username && user.password == DataInput.password )

    if(UserFind.length == 0) throw new Error('User not found');
    
    return UserFind
  }
}
