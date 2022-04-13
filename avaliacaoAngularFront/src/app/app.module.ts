import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PgPrincipalComponent } from './pg-principal/pg-principal.component';
import {HttpClientModule} from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxMaskModule} from 'ngx-mask';
import { MenuComponent } from './menu/menu.component';
import { EstatisticasComponent } from './estatisticas/estatisticas.component'

@NgModule({
  declarations: [
    AppComponent,
    PgPrincipalComponent,
    MenuComponent,
    EstatisticasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextMaskModule,   
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
