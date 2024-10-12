const url = 'http://192.168.1.4:3000';

export const environment = {
    // productos
    listaProductos: `${url}/api/productos`,
    listaProductosAdmin: `${url}/api/productos/admin`,
    getProducto: `${url}/api/producto`,
    crearProducto: `${url}/api/producto/create`,
    actualizarProducto: `${url}/api/producto/update`,
    actualizarImagenProducto: `${url}/api/producto/update/image`,
    imagenesProductos: `${url}/api/imagenes/`,
    listaProductosByCategoria: `${url}/api/productosByCategoria`,
    listaProductosByBusqueda: `${url}/api/productosByBusqueda`,
    listaProductosByOrdenId: `${url}/api/productosByOrdenId`,

    // categorias
    listaCategorias: `${url}/api/categorias`,
    getCategoria: `${url}/api/categoria`,
    crearCategoria: `${url}/api/categoria/create`,
    actualiazarCategoria: `${url}/api/categoria/update`,


    // usuarios
    login: `${url}/api/usuario/login`,
    registroUsuario: `${url}/api/usuario/create`,
    listaEmpleados: `${url}/api/usuario/listEmployees`,
    getUsuario: `${url}/api/usuario`,
    actualizarDatosUsuario: `${url}/api/usuario/update`,
    crearEmpleados: `${url}/api/usuario/createEmployees`,
    getEmpleado: `${url}/api/usuario/employee`,
    actualizarEmpleado: `${url}/api/usuario/update/employee`,
    recuperarPassword: `${url}/api/usuario/restablecer/password`,
    actualizarPasswordUsuario: `${url}/api/usuario/update/password`,

    // ordenes
    crearOrden: `${url}/api/orden/create`,
    cantidadProductosCarrito: `${url}/api/orden/cantidadProductosCarrito`,
    productosCarrito: `${url}/api/orden/productosCarrito`,
    eliminarProductoCarrito: `${url}/api/orden/eliminarProductoCarrito`,
    pagarOrden: `${url}/api/orden/pagarOrden`,
    listaEstadosOrden: `${url}/api/orden/estados`,
    listaOrdenesAdmin: `${url}/api/ordenes/admin`,
    actualizarEstado: `${url}/api/orden/actualizarEstado`,
    listaOrdenesCliente: `${url}/api/ordenes/cliente`,
    confirmarOrdenRecibida: `${url}/api/orden/confirmarOrdenRecibida`,
    

    // roles
    listaRoles: `${url}/api/roles`,




}