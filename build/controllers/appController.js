"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const router = Router();
const nodemailer = require('nodemailer');
const fs = require('fs');
class AppController {
    sendEmail(req, res) {
        var emailTo = "contacto@planta360.cl";
        // var emailTo="felipe.ascencio@virginiogomez.cl"
        var contentHTML;
        const { nombre, email, fono, mensaje } = req.body;
        contentHTML = ` 
          Mensaje de contacto de Planta 360
          Nombre: ${nombre}
          Email: ${email}
          Celular: ${fono}
          Mensaje: ${mensaje}
         `;
        console.log(contentHTML);
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'contactoplanta360@gmail.com',
                pass: 'asdq!33C'
            }
        });
        let mailOptions = {
            from: 'contactoplanta360@gmail.com',
            to: emailTo,
            subject: 'Contacto Planta 360 de ' + nombre,
            text: contentHTML
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.json({ error: error });
            }
            res.json({ text: 'enviado correctamente' });
        });
    }
    //metodos de practica
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password } = req.body;
            console.log(name);
            console.log(password);
            const datos = yield database_1.default.query('SELECT  idUsuario FROM `Usuario`  WHERE nombreUsuario =\'' + name + '\' AND claveUsuario =\'' + password + '\'');
            if (datos.length > 0) {
                console.log('si tiene un dato!');
                console.log(datos[0].idUsuario);
                const data = datos[0].idUsuario;
                const token = jsonwebtoken_1.default.sign({ _id: (datos[0].idUsuario) }, 'secretkey', {
                    expiresIn: "1d" // it will be expired after 10 hours
                    //expiresIn: "20d" // it will be expired after 20 days
                    //expiresIn: 120 // it will be expired after 120ms
                });
                //aqui el token puede tener mas opciones, como su tiempo de vida, cosa que tengo que modificar, para que calze con la hora de inicio y de termino de un espectaculo
                return res.json({ token });
            }
            else {
                return res.status(401).send("correo o contraseña incorrecta");
            }
        });
    }
    getInfoEmpresas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query('SELECT * FROM `Empresa` WHERE activo = 1');
            res.json(data);
        });
    }
    getInfoLinks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query('SELECT * FROM `Link` WHERE activo = 1');
            res.json(data);
        });
    }
    eliminarEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idEmpresa, nombreEmpresa } = req.body;
            console.log(idEmpresa);
            console.log(nombreEmpresa);
            const datos = yield database_1.default.query('UPDATE `Empresa` SET activo = 0  WHERE idEmpresa =\'' + idEmpresa + '\' ');
            const data = yield database_1.default.query('UPDATE `Link` SET activo = 0  WHERE idEmpresa =\'' + idEmpresa + '\' ');
            res.json(datos);
        });
    }
    eliminarLink(req, res) {
        const { idLink, link } = req.body;
        console.log(idLink);
        console.log(link);
        database_1.default.query('UPDATE `Link` SET activo = 0  WHERE idLink =\'' + idLink + '\' ');
        res.json({ text: "eliminado con exito" });
    }
    crearEmpresa(req, res) {
        database_1.default.query('INSERT INTO `Empresa` SET ?', [req.body]);
        res.json({ text: "Empresa agregada" });
    }
    crearLink(req, res) {
        database_1.default.query('INSERT INTO `Link` SET ?', [req.body]);
        res.json({ text: "Link agregada" });
    }
    listBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query('');
            res.json(data);
        });
    }
    listSalas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query('');
            res.json(data);
        });
    }
    listHorarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query('');
            res.json(data);
        });
    }
    guardarCompraEvento(req, res) {
        console.log('ingreso en guardar compra de evento en rest api');
        console.log(req);
        console.log(req.body);
        res.json({ text: "entro" });
    }
    signinUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('signinUsuario en server');
            const { run, password } = req.body;
            console.log(run);
            console.log(password);
            var Productor = {
                idProductor: '',
                admin: ''
            };
            const productor = yield database_1.default.query('SELECT idProductor,admin FROM `productor` WHERE runProductor=\'' + run + '\' AND claveProductor=\'' + password + '\'');
            console.log('productor= ' + productor);
            if (productor.length > 0) {
                Productor = productor[0];
                console.log('id= ' + Productor.idProductor);
                console.log('admin?= ' + Productor.admin);
                const user = jsonwebtoken_1.default.sign({ _id: Productor.idProductor }, 'secretkey');
                return res.status(200).json({ Productor, user });
            }
            else {
                console.log('datos no coinciden');
                return res.status(401).send("run o password incorrecta");
            }
        });
    }
    sendEmailContact(req, res) {
        var contentHTML;
        const { nombre, email, celular, mensaje } = req.body;
        contentHTML = `
          Mensaje de contacto de cultura para todos
          Nombre: ${nombre}
          Email: ${email}
          Celular: ${celular}
          Mensaje: ${mensaje}
         `;
        console.log(contentHTML);
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'productochileoficial@gmail.com',
                pass: 'p@123!..!'
            }
        });
        let mailOptions = {
            from: 'productochileoficial@gmail.com',
            to: 'contacto@culturaparatodos.cl',
            subject: 'Contacto modal CPT de ' + nombre,
            text: contentHTML
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.json({ error: error });
            }
            res.json({ text: 'enviado correctamente' });
        });
    }
    getInfoEspectaculos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('getInfoEspectaculos en server');
            const data = yield database_1.default.query('SELECT e.idEspectaculo as numeroEspectaculo,e.urlClipVideo, e.nombreEspectaculo as nombre,e.descripcionEspectaculo as descripcionCompleta,e.desdeHorario as horaInicio,e.hastaHorario as horaTermino,e.fechaEspectaculo as fecha,e.descripcionResumida,e.valor as precio,e.valorUSD as precioUSD,e.rutaImagenBanner as rutaBanner,e.rutaImagenAfiche as rutaAfiche,t.nombreTipo as tipoEspectaculo,p.nombreProductor as productor,a.nombreArtistas as artista FROM `espectaculo` e INNER JOIN `tipoespectaculo` t ON e.tipoEspectaculo_idTipoEspectaculo = t.idTipoEspectaculo INNER JOIN `productor` p ON e.productor_idProductor = p.idProductor INNER JOIN `artistas` a ON e.artistas_idArtistas = a.idArtistas WHERE e.visible = 1 order by e.idEspectaculo DESC');
            if (data.length > 0) {
                return res.json(data);
            }
            else {
                //return res.status(404).json({ text: "no retorna nada" });
                return res.json(data);
            }
        });
    }
    getVideoPrueba(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('getVideoPrueba en server');
            const data = yield database_1.default.query('SELECT linkvideo FROM `pantallaPruebas`');
            if (data.length > 0) {
                return res.json(data);
            }
            else {
                //return res.status(404).json({ text: "no retorna nada" });
                return res.json(data);
            }
        });
    }
    getInfoAdministrador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //retorna todos los eventos
            console.log('getInfoAdministrador en server');
            const data = yield database_1.default.query('SELECT e.rutaImagenAfiche as rutaImagen,e.nombreEspectaculo as nombreEvento,e.fechaEspectaculo as fechaEvento,e.desdeHorario as horaInicioEvento,e.hastaHorario as horaTerminoEvento,e.descripcionEspectaculo as descripcionEvento,e.valor as valorEvento,e.valorUSD as valorEventoUSD,p.nombreProductor as productor,a.nombreArtistas as artista,COALESCE(SUM(t.valorTransaccion),0)as totalVentas,COALESCE(SUM(t.valorTransaccionUSD),0)as totalVentasUSD,COUNT(t.idTransaccion) as cantidadTicketsVendidos FROM `espectaculo` e inner JOIN `productor` p ON e.productor_idProductor = p.idProductor inner JOIN `artistas` a ON e.artistas_idArtistas = a.idArtistas left join `transaccion` t ON e.idEspectaculo = t.espectaculo_idEspectaculo WHERE e.visible = 1 group by e.idEspectaculo');
            if (data.length > 0) {
                return res.json(data);
            }
            else {
                return res.status(401).json({ text: "no existen eventos en db" });
            }
        });
    }
    getInfoProductor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('idProductor= ' + req.params.id);
            var idProductor = req.params.id;
            //retorna los eventos asociados a este productor
            console.log('getInfoProductor en server');
            const data = yield database_1.default.query('SELECT e.rutaImagenAfiche as rutaImagen,e.nombreEspectaculo as nombreEvento,e.fechaEspectaculo as fechaEvento,e.desdeHorario as horaInicioEvento,e.hastaHorario as horaTerminoEvento,e.descripcionEspectaculo as descripcionEvento,e.valor as valorEvento,e.valorUSD as valorEventoUSD,p.nombreProductor as productor,a.nombreArtistas as artista,COALESCE(SUM(t.valorTransaccion),0)as totalVentas,COALESCE(SUM(t.valorTransaccionUSD),0)as totalVentasUSD,COUNT(t.idTransaccion) as cantidadTicketsVendidos FROM `espectaculo` e inner JOIN `productor` p ON e.productor_idProductor = p.idProductor inner JOIN `artistas` a ON e.artistas_idArtistas = a.idArtistas left join `transaccion` t ON e.idEspectaculo = t.espectaculo_idEspectaculo WHERE e.visible = 1 and p.idProductor = ' + idProductor + ' group by e.idEspectaculo');
            if (data.length > 0) {
                return res.json(data);
            }
            else {
                return res.status(401).json({ text: "productor no posee eventos" });
            }
        });
    }
}
const appController = new AppController();
exports.default = appController;
