import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductosListaComponent } from './productos-lista.component';
import { BlockUIModule } from 'ng-block-ui';
import { NgSelectModule } from '@ng-select/ng-select';

describe('Lista de productos', () => {
  let component: ProductosListaComponent;
  let fixture: ComponentFixture<ProductosListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosListaComponent],
      providers: [ProductosListaComponent],
      imports: [HttpClientTestingModule, BlockUIModule.forRoot(), NgSelectModule],

    });
    fixture = TestBed.createComponent(ProductosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia mostrar el componente lista de productos', () => {
    expect(component).toBeTruthy();
  });
});
