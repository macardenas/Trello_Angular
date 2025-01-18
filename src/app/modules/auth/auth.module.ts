import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigningComponent } from './pages/signing/signing.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SigningComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
  ]
})
export class AuthModule { }
