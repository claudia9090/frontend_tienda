// import { ProductosComponent } from './productos/productos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosListaComponent } from './productos/productos-lista/productos-lista.component';
import { RegistroComponent } from './registro/registro.component';
import { CarritoCompraComponent } from './carrito-compra/carrito-compra.component';
import { ProductosCrearComponent } from './productos/productos-crear/productos-crear.component';
import { ProductosActualizarComponent } from './productos/productos-actualizar/productos-actualizar.component';
import { CategoriasListaComponent } from './categorias/categorias-lista/categorias-lista.component';
import { CategoriasCrearComponent } from './categorias/categorias-crear/categorias-crear.component';
import { CategoriasActualizarComponent } from './categorias/categorias-actualizar/categorias-actualizar.component';
import { EmpleadosListaComponent } from './empleados/empleados-lista/empleados-lista.component';
import { EmpleadosCrearComponent } from './empleados/empleados-crear/empleados-crear.component';
import { EmpleadosActualizarComponent } from './empleados/empleados-actualizar/empleados-actualizar.component';
import { loginGuard } from './guards/login.guard';
import { roleAdminEmpleadoGuard, roleAdminGuard, roleClienteGuard } from './guards/roles.guard';
import { UsuarioActualizarComponent } from './usuarios/usuario-actualizar/usuario-actualizar.component';
import { OrdenesListaAdminComponent } from './ordenes/ordenes-lista-admin/ordenes-lista-admin.component';
import { OrdenesListaClienteComponent } from './ordenes/ordenes-lista-cliente/ordenes-lista-cliente.component';

const routes: Routes = [
  {
    path: '', redirectTo : '/home', pathMatch: 'full'
  },
  {
    path: 'home',
    component: ProductosListaComponent
    // loadChildren: () => import('./productos-lista/productos-lista.component').then(x => x.ProductosListaComponent)
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'carritoCompra',
    component: CarritoCompraComponent,
    canActivate: [loginGuard, roleClienteGuard]
  },
  {
    path: 'crearProducto',
    component: ProductosCrearComponent,
    canActivate: [loginGuard, roleAdminEmpleadoGuard]
  },
  {
    path: 'actualizarProducto/:id',
    component: ProductosActualizarComponent,
    canActivate: [loginGuard, roleAdminEmpleadoGuard]
  },
  {
    path: 'listaCategorias',
    component: CategoriasListaComponent,
    canActivate: [loginGuard, roleAdminEmpleadoGuard]

  },
  {
    path: 'crearCategoria',
    component: CategoriasCrearComponent,
    canActivate: [loginGuard, roleAdminEmpleadoGuard]
  },
  {
    path: 'actualizarCategoria/:id',
    component: CategoriasActualizarComponent,
    canActivate: [loginGuard, roleAdminEmpleadoGuard]
  },
  {
    path: 'listaEmpleados',
    component: EmpleadosListaComponent,
    canActivate: [loginGuard, roleAdminGuard]
  },
  {
    path: 'crearEmpleado',
    component: EmpleadosCrearComponent,
    canActivate: [loginGuard, roleAdminGuard]
  },
  {
    path: 'actualizarEmpleado/:id',
    component: EmpleadosActualizarComponent,
    canActivate: [loginGuard, roleAdminGuard]
  },
  {
    path: 'actualizarUsuario',
    component: UsuarioActualizarComponent,
    canActivate: [loginGuard, roleClienteGuard]
  },
  {
    path: 'listaOrdenesAdmin',
    component: OrdenesListaAdminComponent,
    canActivate: [loginGuard, roleAdminEmpleadoGuard]
  },
  {
    path: 'listaOrdenesCliente',
    component: OrdenesListaClienteComponent,
    canActivate: [loginGuard, roleClienteGuard]
  },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
