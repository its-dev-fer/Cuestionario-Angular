import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular'
import * as Query from '../query'
import { FormGroup, FormControl, Validators } from '@angular/forms'

type pregunta = {
  titulo: String,
  tipo: String,
  descripcion: String,
  respuestas: Object
}

type opcionMultiple = {
  opciones: Object
}

type encuesta = {
  titulo: String,
  descripcion: String,
  preguntas: Object,
  estado: String
}


@Component({
  selector: 'app-editar-borrador',
  templateUrl: './editar-borrador.component.html',
  styleUrls: ['./editar-borrador.component.scss']
})
export class EditarBorradorComponent implements OnInit {
  id: any
  titulo_encuesta: any
  preguntas:any
  descripcion_encuesta:any
  isAdding:boolean = false
  tipo_pregunta: any = null
  questionForm: FormGroup
  saveAsBorradorForm: FormGroup

  constructor(
    private param:ActivatedRoute,
    private apollo:Apollo,
    private router:Router,
  )
  {

    this.questionForm = new FormGroup({
      'titulo': new FormControl('', Validators.required),
      'descripcion': new FormControl('', Validators.required),
      'respuestas': new FormControl('', Validators.required)
    })

    this.saveAsBorradorForm = new FormGroup({
      'titulo': new FormControl('', Validators.required),
      'descripcion': new FormControl('', Validators.required)
    })

    this.param.queryParams.subscribe(params => {
      const json_encuesta = JSON.parse(params['encuesta'])
      this.id = json_encuesta.id
      const _preguntas = JSON.parse(json_encuesta.content)
      const _preguntas_ = JSON.stringify(_preguntas.preguntas)
      this.titulo_encuesta = json_encuesta.name
      this.descripcion_encuesta = json_encuesta.description
      this.preguntas = JSON.parse(_preguntas_)
      this.saveAsBorradorForm.get('titulo').setValue(json_encuesta.name)
      this.saveAsBorradorForm.get('descripcion').setValue(json_encuesta.description)
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

  abortQuestion()
  {
    this.isAdding = false
    this.tipo_pregunta = false
    
  }


  /**
   * Construir una pregunta
   *
   * @return  {pregunta}  Estructura que requiere una pregunta
   */
  buildQuestion(tipo, titulo, descripcion, respuestas) : pregunta
  {
    return{
      titulo: titulo,
      descripcion:  descripcion,
      tipo: tipo,
      respuestas: respuestas
    }
  }

  /**
   * Construir un arreglo de opciones para las preguntas de más de una respuesta
   *
   * @param   {array}  opciones  Opciones disponibles
   *
   * @return  {opcionMultipli}            Se podrá agregar a la pregunta
   */
  buildOptions(opciones) : opcionMultiple
  {
    return {
      opciones: opciones
    }
  }

  /**
   * Construir la estructura de la encuesta completa
   *
   * @param   {array}  preguntas  Arreglo de pregunrtas
   *
   * @return  {encuesta}             Estructura que requiere una encuesta
   */
  buildEncuesta(title, description, preguntas): encuesta
  {
    return {
      titulo: title,
      descripcion: description,
      estado: "Borrador",
      preguntas: preguntas
    }
  }

  addQuestion()
  {
    switch(this.tipo_pregunta)
    {
      case 'texto': {
        let title = this.questionForm.get('titulo').value.trim()
        let descripcion = this.questionForm.get('descripcion').value.trim()
        let respuestas = this.questionForm.get('respuestas').value.trim()

        let pregunta = this.buildQuestion('texto', title, descripcion, respuestas)
        this.preguntas.push(pregunta)
        this.questionForm.reset()
        break
      }

      default: {
        let title = this.questionForm.get('titulo').value.trim()
        let descripcion = this.questionForm.get('descripcion').value.trim()
        let txtOpciones = this.questionForm.get('respuestas').value.trim()
        let arrOpciones = txtOpciones.split(',')
        let opciones = []
        arrOpciones.forEach(option => {
          if(option.trim().length > 0)
          {
            opciones.push(option.trim())
          }
        })
        arrOpciones = this.buildOptions(opciones)
        let pregunta = this.buildQuestion(this.tipo_pregunta, title, descripcion, opciones)
        this.preguntas.push(pregunta)
        this.questionForm.reset()
        break
      }
    }
    //let pregunta = this.buildQuestion(this.tipo_pregunta, )
    //this.array_preguntas.push(pregunta)
    this.isAdding = false
    this.tipo_pregunta = null
  }

  /**
   * La encuesta ya se puede guardar
   *
   * @return  {boolean}
   */
  canSave()
  {
    if(this.preguntas.length >= 1)
    {
      return false
    }
    else
    {
      return true
    }
  }


  /**
   * Guardar como borrador
   */
  async updateBorrador()
  {
    let nombre = this.saveAsBorradorForm.get('titulo').value
    let descripcion = this.saveAsBorradorForm.get('descripcion').value
    let encuesta = this.buildEncuesta(nombre, descripcion,this.preguntas)
    await this.apollo.mutate({
      mutation: Query.updateEncuesta,
      variables:{
        id: parseInt(this.id),
        name: nombre,
        description: descripcion,
        content: JSON.stringify(encuesta),
        status: false,
        deleted: false
      }
    })
    .subscribe(data => {
      this.router.navigateByUrl('')
    }, error => {
      alert('No se pudo guardar la encuesta')
    })
  }


  deletePregunta(index){
    this.preguntas.splice(index, 1)
  }

}
