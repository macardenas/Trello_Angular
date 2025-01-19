import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SigningGuard } from './guards/signing.guard'

const routes: Routes = [
  {
    path: 'signing',
    loadChildren: () => import('../app/modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'todo',
    loadChildren: () => import('../app/modules/todo/todo.module').then(m => m.TodoModule),
    canActivate: [SigningGuard]
  },
  {
    path: '**',
    redirectTo: 'signing',
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
