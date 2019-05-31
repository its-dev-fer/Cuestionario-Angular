import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular'
import * as Query from '../query'

@Component({
  selector: 'app-editar-borrador',
  templateUrl: './editar-borrador.component.html',
  styleUrls: ['./editar-borrador.component.scss']
})
export class EditarBorradorComponent implements OnInit {
  id = null
  encuesta = null
  constructor(
    private param:ActivatedRoute,
    private apollo:Apollo
  ) { }

  ngOnInit() {
    this.id = this.param.paramMap.subscribe(params => {
      console.log(params.get('item'))
      this.id = parseInt(params.get('item'))
      this.encuesta = this.getByID(this.id)
    })
  }

  async getByID(id)
  {
    /*
    this.apollo.mutate({
      mutation: Query.getEncuesta,
      variables: {
        id: id
      },
      update:(proxy, {data: {getEncuesta}}) => {
        console.log(getEncuesta)
      }
    }).subscribe(response => {
      console.log(response)
    })*/
    await this.apollo.watchQuery({
      query: Query.getEncuesta,
      variables:
      {
        id: id
      }
    })
    .valueChanges.subscribe(response => {
      console.log(response)
      console.log(response.data['getEncuesta'])
    })
  }

}
