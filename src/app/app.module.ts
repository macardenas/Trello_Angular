import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
  declarations: [ AppComponent, ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
