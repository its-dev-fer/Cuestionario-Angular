import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BorradoresComponent } from './borradores/borradores.component'
import { EncuestasComponent } from './encuestas/encuestas.component'
import { CrearEncuestaComponent } from './crear-encuesta/crear-encuesta.component'
import { EditarBorradorComponent } from './editar-borrador/editar-borrador.component';
import { VerEncuestaComponent } from './ver-encuesta/ver-encuesta.component';

const routes: Routes = [
  { path:'', component: EncuestasComponent },
  { path:'borradores', component: BorradoresComponent },
  { path:'nueva-encuesta', component: CrearEncuestaComponent },
  { path:'editar-borador', component: EditarBorradorComponent },
  { path: 'ver-encuesta/:id', component: VerEncuestaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
