import { Router } from "express";
import appController from "../controllers/appController";
import jwt from 'jsonwebtoken';

// var multipart = require('connect-multiparty');
// const multiPartMiddleware=multipart({
//      uploadDir:'./src/solicitud-onePage'
     
// })

// const multiPartMiddlewareProducto=multipart({
//      uploadDir:'./src/imagenes/productos'
// })

// const multiPartMiddlewareServicio=multipart({
//      uploadDir:'./src/imagenes/servicios'
// })

class AppRoutes {

     public router: Router = Router();

     constructor() {
          this.config();
     }

     config(): void {


          this.router.post('/send-email',appController.sendEmail);
          this.router.post('/signin', appController.signin);
          this.router.get('/get-info-empresas',appController.getInfoEmpresas); 
          this.router.get('/get-info-links',appController.getInfoLinks);
          this.router.post('/eliminar-empresa', appController.eliminarEmpresa);  
          this.router.post('/eliminar-link', appController.eliminarLink);
          this.router.post('/crear-empresa', appController.crearEmpresa);

          //get listado de info que ira en banner de home, tal como la ruta de la imagen, su descripcion,horario,etc
          this.router.get('list-banner',appController.listBanner)

          //get salas trae info de salas en estreno, por lo que hace un get de espectaculos que esten en la fecha proxima, asi como la ruta de la imagen, horario y descripcion 
          this.router.get('/list-salas',appController.listSalas)
 
          //get horarios, verifica los horarios de los espectaculos disponibles en la seccion de salas, trae el logo del organizador, su nombre y el horario
          this.router.get('/list-horarios',appController.listHorarios)
           
          this.router.post('/guardar-compra-de-espectaculo',appController.guardarCompraEvento); 


          this.router.post('/signin', appController.signin);
          this.router.post('/signin-usuario', appController.signinUsuario);
          this.router.post('/send-email-contact',appController.sendEmailContact);
          this.router.get('/get-info-espectaculos', appController.getInfoEspectaculos);


          this.router.get('/get-video-prueba', appController.getVideoPrueba);

          this.router.get('/get-info-productor/:id', appController.getInfoProductor);
          this.router.get('/get-info-administrador', appController.getInfoAdministrador);
          //rutas de productos chile en caso que se necesite una refencia  
          //productos chile
          // this.router.get('/list-all', appController.list);
          // this.router.get('/get-one/:id', appController.getOne);
          // this.router.post('/a', appController.create);
          // this.router.delete('/:id', appController.delete);
          // this.router.post('/send-email-user',appController.sendEmailUser);
          // this.router.post('/send-email-client',appController.sendEmailClient);
          // this.router.post('/signin', appController.signin);
          // this.router.get('/get-usuario/:id', appController.getUsuario);
          // this.router.get('/get-pyme/:id', appController.getPyme);
          // this.router.put('/update-datos-empresariales/:id', appController.updateDatosEmpresariales);
          // this.router.put('/update-datos-usuario/:id', appController.updateDatosUsuario);
          // this.router.put('/update-usuario-password/:id', appController.updateUsuarioPassword);
          // this.router.post('/solicitar-OnePage/:id', appController.solicitarOnePage);
          // this.router.get('/get-productos-by-user/:id', appController.getProductosbyUser);
          // this.router.get('/get-servicios-by-user/:id', appController.getServiciosbyUser);
          // this.router.put('/delete-producto/:id', appController.deleteProducto);
          // this.router.put('/delete-service/:id', appController.deleteService);
          // this.router.put('/update-producto/:id', appController.updateProducto);
          // this.router.put('/update-service/:id', appController.updateService);
          
          // this.router.get('/get-tipos-servicios-by-rubro/:id', appController.getTiposServiciosbyRubro);
          // this.router.post('/add-producto', appController.addProducto);
          // this.router.post('/add-service', appController.addService);
          // this.router.post('/get-productos-servicios-por-nombre', appController.getProductosServiciosPorNombre);
          // this.router.post('/get-productos-servicios-por-rubro', appController.getProductosServiciosPorRubro);
          // this.router.post('/get-productos-servicios-por-filtros', appController.getProductosServiciosPorFiltros);
          // this.router.post('/get-producto-servicio/:id', appController.getProductoServicio);
          // this.router.get('/get-producto-servicio-from-home/:id', appController.getProductoServicioFromHome);
          // this.router.post('/subir-imagen-node',multiPartMiddleware,appController.subirImagenNode)

          // this.router.post('/subir-imagenes-cabecera-node/:id',multiPartMiddleware,appController.subirImagenesCabeceraNode)
          // this.router.post('/subir-imagenes-caracteristica-node/:id',multiPartMiddleware,appController.subirImagenesCaracteristicaNode)
          // this.router.post('/subir-imagen-pyme-node/:id',multiPartMiddleware,appController.subirImagenPymeNode) 
          // this.router.post('/subir-imagenes-producto-servicio-node/:id',multiPartMiddleware,appController.subirImagenesProductoServicioNode)

          // this.router.post('/subir-imagenes-producto-servicio-almacen-10-node/:id',multiPartMiddleware,appController.subirImagenesProductoServicioAlmacen10Node)
          // this.router.post('/subir-imagenes-producto-servicio-almacen-20-node/:id',multiPartMiddleware,appController.subirImagenesProductoServicioAlmacen20Node)
          // this.router.post('/subir-imagenes-producto-servicio-almacen-30-node/:id',multiPartMiddleware,appController.subirImagenesProductoServicioAlmacen30Node)


          // this.router.post('/subir-imagen-producto-server',multiPartMiddlewareProducto,appController.subirImagenProductoServer)
          // this.router.post('/subir-imagen-servicio-server',multiPartMiddlewareServicio,appController.subirImagenServicioServer)
          // this.router.post('/send-email-solicitud-producto',multiPartMiddlewareServicio,appController.sendEmailSolicitudProducto)
          // this.router.post('/send-email-solicitud-servicio',multiPartMiddlewareServicio,appController.sendEmailSolicitudServicio)
          
          // this.router.get('/get-pymes-por-entidad/:id', appController.getPymesPorEntidad);
          // this.router.get('/get-entidades/:pais', appController.getEntidades);
     }
}

const appRoutes= new AppRoutes();
export default appRoutes.router;

function verifyToken(req:any,res:any,next:any) {
     console.log(req.headers.authorization)
     //en el header viene el authorization, que es el token, si es undefined es porque no viene nada, o sea, no esta logueado, si viene algo, se tiene que comprobar que es un token valido
     if(!req.headers.authorization){
          //si no viene algo en el authorization
        return res.status(401).send('unauthorized request')
     }
     const token=req.headers.authorization.split(' ')[1]
     //dividimos el req en 2 , por que despues del espacio esta el token como tal
     console.log(token)
     if(token==null){// si el token que viene es nulo, retornamos el mensaje de solicitud no autorizada
          return res.status(401).send('unauthorized request')  
     }
     console.log('error')
     const payload:any=jwt.verify(token,'secretkey')
     //ejemplo de token=  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjE2LCJpYXQiOjE1NzcyOTE4MTB9.mE-duTHebllE1LhYFjDqPVoI21JzBzjAqhqnKfqlO2o
     console.log(payload);//aqui tenemos 2 datos , el id y iat, el id es lo unico importante 
     req.userId=payload._id;
     next()
}