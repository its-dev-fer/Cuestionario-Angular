import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-borradores',
  templateUrl: './borradores.component.html',
  styleUrls: ['./borradores.component.scss']
})
export class BorradoresComponent implements OnInit {

  encuestas:any = []
  constructor(
    private router:Router,
  ) { }

  ngOnInit() {
  }
}
