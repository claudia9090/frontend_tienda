import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosCrearComponent } from './productos-crear.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BlockUIModule } from 'ng-block-ui';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';

describe('Crear producto', () => {
  let component: ProductosCrearComponent;
  let fixture: ComponentFixture<ProductosCrearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosCrearComponent],
      providers: [ProductosCrearComponent],
      imports: [HttpClientTestingModule, BlockUIModule.forRoot(), NgSelectModule, ReactiveFormsModule],

    });
    fixture = TestBed.createComponent(ProductosCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia mostrar el componente crear producto', () => {
    expect(component).toBeTruthy();
  });
});