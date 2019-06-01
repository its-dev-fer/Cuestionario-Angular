import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular'
import * as Query from '../query'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-editar-borrador',
  templateUrl: './editar-borrador.component.html',
  styleUrls: ['./editar-borrador.component.scss']
})
export class EditarBorradorComponent implements OnInit {
  titulo_encuesta: any
  preguntas:any
  descripcion_encuesta:any
  isAdding:boolean = false
  tipo_pregunta: any = null
  questionForm: FormGroup
  saveAsBorradorForm: FormGroup

  constructor(
    private param:ActivatedRoute,
    private apollo:Apollo
  )
  {
    this.param.queryParams.subscribe(params => {
      const json_encuesta = JSON.parse(params['encuesta'])
      const _preguntas = JSON.parse(json_encuesta.content)
      const _preguntas_ = JSON.stringify(_preguntas.preguntas)
      this.titulo_encuesta = json_encuesta.name
      this.descripcion_encuesta = json_encuesta.description
      this.preguntas = JSON.parse(_preguntas_)
      //console.log(JSON.parse(JSON.stringify(json_encuesta.content.preguntas)))
      //this.encuesta = JSON.parse(params['encuesta'])
    })
  }
  
  async ngOnInit() {
    // this.param.paramMap.subscribe(params => {
    //   this.id = parseInt(params.get('item'))
    // }).unsubscribe()

  }

  showAddQuestion(tipo)
  {
    this.isAdding = true
    this.tipo_pregunta = tipo
  }

  /**
   * Bloquear los botones si se está agregando una pregunta
   *
   * @return  {[boolean]}  ¿Está agregando una pregunta?
   */
  is_adding()
  {
    return this.isAdding
  }

  addQuestion()
  {}

  abortQuestion()
  {
    this.isAdding = false
    this.tipo_pregunta = false
    
  }

}
