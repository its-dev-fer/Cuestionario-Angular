import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBorradorComponent } from './editar-borrador.component';

describe('EditarBorradorComponent', () => {
  let component: EditarBorradorComponent;
  let fixture: ComponentFixture<EditarBorradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarBorradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarBorradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
