import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuarioActualizarComponent } from './usuario-actualizar.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BlockUIModule } from 'ng-block-ui';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';

describe('Registro de usuario', () => {
  let component: UsuarioActualizarComponent;
  let fixture: ComponentFixture<UsuarioActualizarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioActualizarComponent],
      providers: [UsuarioActualizarComponent],
      imports: [HttpClientTestingModule, BlockUIModule.forRoot(), NgSelectModule, ReactiveFormsModule],

    });
    fixture = TestBed.createComponent(UsuarioActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia mostrar el componente registro de usuario', () => {
    expect(component).toBeTruthy();
  });
});