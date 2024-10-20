import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoriasListaComponent } from './categorias-lista.component';
import { BlockUIModule } from 'ng-block-ui';
import { NgSelectModule } from '@ng-select/ng-select';

describe('Lista de categorias', () => {
  let component: CategoriasListaComponent;
  let fixture: ComponentFixture<CategoriasListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriasListaComponent],
      providers: [CategoriasListaComponent],
      imports: [HttpClientTestingModule, BlockUIModule.forRoot(), NgSelectModule],

    });
    fixture = TestBed.createComponent(CategoriasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia mostrar el componente lista de categorias', () => {
    expect(component).toBeTruthy();
  });
});
