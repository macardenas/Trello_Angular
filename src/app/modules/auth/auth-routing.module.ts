import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigningComponent } from './pages/signing/signing.component';

const routes: Routes = [
  {
    path: '',
    component: SigningComponent
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class AuthRoutingModule { }
