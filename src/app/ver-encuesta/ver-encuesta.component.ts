import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular'
import * as Query from '../query'
import { FormGroup, FormControl, Validators } from '@angular/forms'
@Component({
  selector: 'app-ver-encuesta',
  templateUrl: './ver-encuesta.component.html',
  styleUrls: ['./ver-encuesta.component.scss']
})
export class VerEncuestaComponent implements OnInit {

  titulo_encuesta: any = null
  preguntas:any
  descripcion_encuesta:any

  constructor(
    private param:ActivatedRoute,
    private apollo:Apollo,
    private router:Router,
  ) {
    this.param.queryParams.subscribe(params => {
      const json_encuesta = JSON.parse(params['encuesta'])
      this.titulo_encuesta = json_encuesta.name
      this.descripcion_encuesta = json_encuesta.description
      const _encuesta = JSON.parse(JSON.parse(json_encuesta.content))
      this.preguntas = _encuesta.preguntas

      //console.log(json_encuesta)
      // console.log(JSON.stringify(JSON.parse(json_encuesta.content)))
      // const _preguntas = JSON.parse(json_encuesta.content)
      // console.log(_preguntas)
      // const _preguntas_ = JSON.parse(_preguntas.preguntas)
      // console.log(json_encuesta)
      // this.titulo_encuesta = json_encuesta.name
      // this.descripcion_encuesta = json_encuesta.description
      // this.preguntas = JSON.parse(_preguntas_)
    })
  }

  ngOnInit() {
  }

}
