import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriasCrearComponent } from './categorias-crear.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BlockUIModule } from 'ng-block-ui';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';

describe('Crear categoria', () => {
  let component: CategoriasCrearComponent;
  let fixture: ComponentFixture<CategoriasCrearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriasCrearComponent],
      providers: [CategoriasCrearComponent],
      imports: [HttpClientTestingModule, BlockUIModule.forRoot(), NgSelectModule, ReactiveFormsModule],

    });
    fixture = TestBed.createComponent(CategoriasCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia mostrar el componente crear categoria', () => {
    expect(component).toBeTruthy();
  });
});