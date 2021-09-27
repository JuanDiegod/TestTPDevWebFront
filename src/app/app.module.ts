import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpresaService } from './servicios/empresa.service';
import { HttpClientModule } from '@angular/common/http';
import { ConsultaEmpresaComponent } from './consulta-empresa/consulta-empresa.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpresaComponent,
    ConsultaEmpresaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [EmpresaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
