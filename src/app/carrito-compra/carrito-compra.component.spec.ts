import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoCompraComponent } from './carrito-compra.component';

describe('CarritoCompraComponent', () => {
  let component: CarritoCompraComponent;
  let fixture: ComponentFixture<CarritoCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoCompraComponent]
    });
    fixture = TestBed.createComponent(CarritoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
