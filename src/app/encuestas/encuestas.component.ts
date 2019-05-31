import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
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
}
