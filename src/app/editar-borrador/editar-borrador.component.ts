import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular'
import * as Query from '../query'
import { FormGroup, FormControl, Validators } from '@angular/forms'

type encuesta = {
  titulo: String,
  descripcion: String,
  preguntas: Object,
  estado: Boolean
}

@Component({
  selector: 'app-editar-borrador',
  templateUrl: './editar-borrador.component.html',
  styleUrls: ['./editar-borrador.component.scss']
})
export class EditarBorradorComponent implements OnInit {
  id = null
  encuesta:encuesta
  isAdding:boolean = false
  tipo_pregunta: any = null
  questionForm: FormGroup
  saveAsBorradorForm: FormGroup

  constructor(
    private param:ActivatedRoute,
    private apollo:Apollo
  )
  {
  }
  
  async ngOnInit() {
    await this.getByID().then(res => {
      console.log(res)
    })
    this.questionForm = new FormGroup({
      'titulo': new FormControl('', Validators.required),
      'descripcion': new FormControl('', Validators.required),
      'respuestas': new FormControl('', Validators.required)
    })
  }

  async getByID()
  {
    this.param.paramMap.subscribe(params => {
      this.id = parseInt(params.get('item'))
    }).unsubscribe()
    console.log(typeof(this.id))
    return await this.apollo.watchQuery({
      query: Query.getAllEncuestas
    })
    .valueChanges.subscribe(response => {
      let encuestas =  response.data['getAllEncuestas']
      encuestas.forEach(element => {
        if(element.id == this.id)
        {
          const el:encuesta = {
            titulo: element.name,
            descripcion: element.description,
            preguntas: element.content,
            estado: element.status
          }
          this.encuesta = el
          return el
        }
      });
    }).unsubscribe()
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
