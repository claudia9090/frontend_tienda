import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriasActualizarComponent } from './categorias-actualizar.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BlockUIModule } from 'ng-block-ui';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';

describe('Actualizar categoria', () => {
  let component: CategoriasActualizarComponent;
  let fixture: ComponentFixture<CategoriasActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriasActualizarComponent],
      imports: [HttpClientTestingModule, BlockUIModule.forRoot(), NgSelectModule, ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '3' }),
            queryParams: of({ search: 'categoria' }),
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? '3' : null),
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia mostrar el componente actualizar categoria', () => {
    expect(component).toBeTruthy();
  });
});
