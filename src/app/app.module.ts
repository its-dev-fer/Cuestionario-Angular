import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSemanticModule } from 'ng-semantic';
import { BorradoresComponent } from './borradores/borradores.component';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { CrearEncuestaComponent } from './crear-encuesta/crear-encuesta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { EditarBorradorComponent } from './editar-borrador/editar-borrador.component';
import { VerEncuestaComponent } from './ver-encuesta/ver-encuesta.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    BorradoresComponent,
    EncuestasComponent,
    CrearEncuestaComponent,
    EditarBorradorComponent,
    VerEncuestaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSemanticModule,
    ReactiveFormsModule,
    GraphQLModule,
    HttpClientModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
