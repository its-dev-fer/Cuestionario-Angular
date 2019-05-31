import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Apollo } from 'apollo-angular'
//import * as Query from './query'
type encuesta = {
  titulo: String,
  descripcion: String,
  preguntas: Object,
  estado: String
}

type pregunta = {
  titulo: String,
  tipo: String,
  descripcion: String,
  respuestas: Object
}

type opcionMultiple = {
  opciones: Object
}

@Component({
  selector: 'app-crear-encuesta',
  templateUrl: './crear-encuesta.component.html',
  styleUrls: ['./crear-encuesta.component.scss']
})
export class CrearEncuestaComponent implements OnInit {
  array_preguntas: any = []

  // booleanas para saber que pepsi, si será texto, select, multiple, o radio
  isAdding:boolean = false
  tipo_pregunta: any = null
  questionForm: FormGroup
  constructor(
    private apollo:Apollo
  )
  {
    this.questionForm = new FormGroup({
      'titulo': new FormControl('', Validators.required),
      'descripcion': new FormControl('', Validators.required),
      'respuestas': new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    /*
    let pregunta = this.buildQuestion()
    this.array_preguntas.push(pregunta)
    this.array_preguntas.push(pregunta)
    console.log(JSON.stringify(pregunta))
    let _encuesta = this.buildEncuesta(this.array_preguntas)
    console.log(JSON.stringify(_encuesta))*/
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
  buildEncuesta(preguntas): encuesta
  {
    return {
      titulo: "Mi cuestionario",
      descripcion: "Ejemplo",
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
        this.array_preguntas.push(pregunta)
        this.questionForm.reset()
        console.log(this.array_preguntas)
        break
      }

      default: {
        let title = this.questionForm.get('titulo').value.trim()
        let descripcion = this.questionForm.get('descripcion').value.trim()
        let txtOpciones = this.questionForm.get('respuestas').value.trim()
        let arrOpciones = txtOpciones.split(',')
        let opciones = []
        arrOpciones.forEach(option => {
          //console.log(option.trim())
          if(option.trim().length > 0)
          {
            opciones.push(option.trim())
          }
        })
        arrOpciones = this.buildOptions(opciones)
        let pregunta = this.buildQuestion(this.tipo_pregunta, title, descripcion, opciones)
        console.log(pregunta)
        this.array_preguntas.push(pregunta)
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
   * Mostrar el div que agrega una nueva pregunta
   *
   * @param   {string}  tipo  Tipo de pregunta
   *
   */
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

  /**
   * Cancelar la edición de una pregunta, no se guarda en el arreglo de preguntas.
   *
   * @return  {[type]}  [return description]
   */
  abortQuestion()
  {
    this.isAdding = false
    this.tipo_pregunta = false
    this.questionForm.reset()
  }

  /**
   * La encuesta ya se puede guardar
   *
   * @return  {boolean}
   */
  canSave()
  {
    if(this.array_preguntas.length >= 10)
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
  saveAsBorrador()
  {
    let encuesta = this.buildEncuesta(this.array_preguntas)
    console.log(JSON.stringify(encuesta))
  }

  /**
   * Publicar la encuesta, ya no se podrá editar
   */
  publish()
  {

  }


  hasAQuestion()
  {
    if(this.array_preguntas.length > 0)
    {
      return true
    }
    return false
  }

}
