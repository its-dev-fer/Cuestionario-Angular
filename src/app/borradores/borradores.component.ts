import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'
import { Apollo } from 'apollo-angular'
import * as Query from '../query'
@Component({
  selector: 'app-borradores',
  templateUrl: './borradores.component.html',
  styleUrls: ['./borradores.component.scss']
})
export class BorradoresComponent implements OnInit {

  encuestas:any = []
  borradores:any = []
  hasAQuestion:boolean = false
  constructor(
    private router: Router,
    private apollo: Apollo,
  ) { }

  ngOnInit() {
   this.getAllEncuestas() 
  }

  getAllEncuestas()
  {
    this.apollo.watchQuery({
      query: Query.getAllEncuestas
    })
    .valueChanges.subscribe(response => {
      this.encuestas = response.data['getAllEncuestas']
      this.encuestas.forEach(element => {
        if(element.status == 0 && element.deleted == 0)
        {
          this.borradores.push(element)
        }
      });
      this.checkIfHasAQuestion()
    })
  }


  showBorrador(encuesta)
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "encuesta": JSON.stringify(encuesta)
      }
    }

    this.router.navigate(["editar-borador"], navigationExtras)
  }

  async deletePregunta(encuesta)
  {
    await this.apollo.mutate({
      mutation: Query.updateEncuesta,
      variables:{
        id: parseInt(encuesta.id),
        name: encuesta.name,
        description: encuesta.description,
        content: JSON.stringify(encuesta.content),
        status: false,
        deleted: true
      }
    })
    .subscribe(data => {
      this.encuestas.forEach((e,index )=> {
        if(e.id == parseInt(encuesta.id))
        {
          this.encuestas.splice(index,1)
        }
      });
    }, error => {
      console.log(error)
      alert('No se pudo eliminar la encuesta')
    })
  }

  checkIfHasAQuestion()
  {
    if(this.borradores.length > 0)
    {
      this.hasAQuestion = true
      return true
    }
    this.hasAQuestion = false
  }


  async publish(encuesta)
  {
    await this.apollo.mutate({
      mutation: Query.updateEncuesta,
      variables:{
        id: parseInt(encuesta.id),
        name: encuesta.name,
        description: encuesta.description,
        content: JSON.stringify(encuesta.content),
        status: true,
        deleted: false
      }
    })
    .subscribe(data => {
      this.router.navigateByUrl('')
    }, error => {
      console.log(error)
      alert('No se pudo publicar la encuesta')
    })
  }
}