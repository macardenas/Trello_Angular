import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigningComponent } from './pages/signing/signing.component';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    SigningComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
