import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosActualizarComponent } from './productos-actualizar.component';

describe('ProductosActualizarComponent', () => {
  let component: ProductosActualizarComponent;
  let fixture: ComponentFixture<ProductosActualizarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosActualizarComponent]
    });
    fixture = TestBed.createComponent(ProductosActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
