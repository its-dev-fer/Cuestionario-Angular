import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'
import { Apollo } from 'apollo-angular'
import * as Query from '../query'
@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {

  encuestas:any = []

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
      console.log(response)
      this.encuestas = response.data['getAllEncuestas']
    })
  }


  showBorrador(encuesta)
  {
    console.log('Llega')
    console.log(JSON.stringify(encuesta))
    console.log('-------')
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "encuesta": JSON.stringify(encuesta)
      }
    }

    this.router.navigate(["editar-borador"], navigationExtras)
  }

  deletePregunta(index)
  {
    this.apollo.mutate({
      mutation: Query.deleteEncuesta,
      variables: {
        id: parseInt(index)
      }
    })
  }
}
