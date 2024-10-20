import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosActualizarComponent } from './productos-actualizar.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BlockUIModule } from 'ng-block-ui';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';

describe('Actualizar producto', () => {
  let component: ProductosActualizarComponent;
  let fixture: ComponentFixture<ProductosActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductosActualizarComponent],
      imports: [HttpClientTestingModule, BlockUIModule.forRoot(), NgSelectModule, ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
            queryParams: of({ search: 'producto' }),
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? '123' : null),
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia mostrar el componente actualizar producto', () => {
    expect(component).toBeTruthy();
  });
});
