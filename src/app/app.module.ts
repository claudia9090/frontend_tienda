import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductosListaComponent } from './productos/productos-lista/productos-lista.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { CarritoCompraComponent } from './carrito-compra/carrito-compra.component';
import { ProductosCrearComponent } from './productos/productos-crear/productos-crear.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductosActualizarComponent } from './productos/productos-actualizar/productos-actualizar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BlockUIModule } from 'ng-block-ui';
import { CategoriasListaComponent } from './categorias/categorias-lista/categorias-lista.component';
import { CategoriasCrearComponent } from './categorias/categorias-crear/categorias-crear.component';
import { CategoriasActualizarComponent } from './categorias/categorias-actualizar/categorias-actualizar.component';
import { EmpleadosListaComponent } from './empleados/empleados-lista/empleados-lista.component';
import { EmpleadosCrearComponent } from './empleados/empleados-crear/empleados-crear.component';
import { EmpleadosActualizarComponent } from './empleados/empleados-actualizar/empleados-actualizar.component';
import { UsuarioActualizarComponent } from './usuarios/usuario-actualizar/usuario-actualizar.component';
import { OrdenesListaAdminComponent } from './ordenes/ordenes-lista-admin/ordenes-lista-admin.component';
import { OrdenesListaClienteComponent } from './ordenes/ordenes-lista-cliente/ordenes-lista-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductosListaComponent,
    RegistroComponent,
    CarritoCompraComponent,
    ProductosCrearComponent,
    ProductosActualizarComponent,
    CategoriasListaComponent,
    CategoriasCrearComponent,
    CategoriasActualizarComponent,
    EmpleadosListaComponent,
    EmpleadosCrearComponent,
    EmpleadosActualizarComponent,
    UsuarioActualizarComponent,
    OrdenesListaAdminComponent,
    OrdenesListaClienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule,
    BlockUIModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
