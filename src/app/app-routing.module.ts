import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BorradoresComponent } from './borradores/borradores.component'
import { EncuestasComponent } from './encuestas/encuestas.component'
import { CrearEncuestaComponent } from './crear-encuesta/crear-encuesta.component'
import { EditarBorradorComponent } from './editar-borrador/editar-borrador.component';

const routes: Routes = [
  { path:'', component: EncuestasComponent },
  { path:'borradores', component: BorradoresComponent },
  { path:'nueva-encuesta', component: CrearEncuestaComponent },
  { path:'editar-borador/:item', component: EditarBorradorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
