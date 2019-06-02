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
  todas:any = []
  encuestas:any = []
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
        this.todas = response.data['getAllEncuestas']
        this.todas.forEach(element => {
          if(element.status == 1 && element.deleted == 0)
          {
            this.encuestas.push(element)
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
      if(this.encuestas.length > 0)
      {
        this.encuestas.forEach(element => {
          if(element.status == 1 && element.deleted == 0)
          {
            this.hasAQuestion = true
            return true
          }
        });
      }
    }
    
    
    view(encuesta)
    {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "encuesta": JSON.stringify(encuesta)
        }
      }
      
      this.router.navigate(["ver-encuesta"], navigationExtras)
    }
  }
  