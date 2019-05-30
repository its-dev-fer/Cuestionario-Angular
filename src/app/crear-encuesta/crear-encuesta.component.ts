import { Component, OnInit } from '@angular/core';


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

@Component({
  selector: 'app-crear-encuesta',
  templateUrl: './crear-encuesta.component.html',
  styleUrls: ['./crear-encuesta.component.scss']
})
export class CrearEncuestaComponent implements OnInit {

  hasAQuestion: boolean = false

  array_preguntas: any = []

  constructor() { }

  ngOnInit() {
    let pregunta = this.buildQuestion()
    this.array_preguntas.push(pregunta)
    this.array_preguntas.push(pregunta)
    console.log(JSON.stringify(pregunta))
    let _encuesta = this.buildEncuesta(this.array_preguntas)
    console.log(JSON.stringify(_encuesta))
  }

  /**
   * Construir una pregunta
   *
   * @return  {pregunta}  Estructura que requiere una pregunta
   */
  buildQuestion() : pregunta
  {
    return{
      titulo: "Pregunta 1",
      descripcion:  "Lo que sea",
      tipo: "texto",
      respuestas: null
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



}
