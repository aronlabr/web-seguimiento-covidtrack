const express = require('express');
const router = express.Router();

router.get('/',(peticion,respuesta)=>{
    respuesta.render('index');
});
router.get('/login',(peticion,respuesta)=>{
    respuesta.render('login');
});
router.get('/register',(peticion,respuesta)=>{
    respuesta.render('register');
});
router.get('/forget',(peticion,respuesta)=>{
    respuesta.render('forget');
});

router.get('/dash',(peticion,respuesta)=>{
    respuesta.render('dash');
});

//Rutas del dash Paciente
router.get('/paciente',(req,respuesta)=>{
  
    respuesta.render('../views/paciente/index.ejs',{
        login:true,
        NOMBRE: req.session.NOMBRe,
        NDOC: "JUAN GAMARRA",
        NCOR: "juangamarra@gmail.com",
        CELDOC: "978546123",
        SEXODOC: "M"
    });

});

router.get('/paciente/informacion',(req,res)=>{
    if(req.session.loggedin){
        res.render('../views/paciente/sites/info.ejs',{
            login:true,
            NOMBRE: req.session.NOMBRe,
            DNI: req.session.DNi,
            DIRECCION: req.session.DIRECCIOn,
            TELEFONO: req.session.TELEFONo,
            CORREO: req.session.CORREo,
            EDAD: req.session.EDAd,
            SEXO: req.session.SEXo,
            DISTRITO: req.session.DISTRITo,
            REGION: 'region'
            
        });

    }else{
        res.render('/views/login.ejs',{
            login: false
        });
    }
                            
});

router.get('/paciente/citas',(req,respuesta)=>{
    respuesta.render('../views/paciente/sites/citas.ejs',{
        login:true,
        NOMBRE: req.session.NOMBRe,
    });
});
  //12 auth page
router.get('/paciente/ajustes',(req,res)=>{
    if(req.session.loggedin){
        res.render('../views/paciente/sites/ajustes.ejs',{
            login:true,
            NOMBRE: req.session.NOMBRe,
            DNI: req.session.DNi,
            DIRECCION: req.session.DIRECCIOn,
            TELEFONO: req.session.TELEFONo,
            CORREO: req.session.CORREo,
            EDAD: req.session.EDAd,
            SEXO: req.session.SEXo,
            DISTRITO: req.session.DISTRITo,
            REGION: 'region'
        });

    }else{
        res.render('/views/login.ejs',{
            login: false
        });
    }
});

router.get('/paciente/formulario',(req,respuesta)=>{

    respuesta.render('../views/paciente/sites/formulario.ejs',{
        login:true,
        NOMBRE: req.session.NOMBRe,
    });
});

router.get('/paciente/logout',(req,res)=>{
    req.session.destroy((err) => {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/login'); // siempre se ejecutará después de que se destruya la sesión
            console.log("cerraste sesion 2");
        }
	});
})
//Fin de las rutas del dash paciente


//Rutas del dash DOCTOR
router.get('/doctor',(peticion,respuesta)=>{
    respuesta.render('../views/doctor/index.ejs');
});

router.get('/doctor/informacion',(peticion,respuesta)=>{                            
    respuesta.render('../views/doctor/sites/info.ejs');
});

router.get('/doctor/pacientes',(peticion,respuesta)=>{                            
    respuesta.render('../views/doctor/sites/pacientes.ejs');
});

router.get('/doctor/citas',(peticion,respuesta)=>{
    respuesta.render('../views/doctor/sites/citas.ejs');
});
  //12 auth page
router.get('/doctor/ajustes',(req,res)=>{
    if(/*req.session.loggedin*/ true){
        res.render('../views/doctor/sites/ajustes.ejs',{
            login:true,
            NOMBRE: "req.session.NOMBRe",
            DNI: "req.session.DNi",
            DIRECCION: "req.session.DIRECCIOn",
            TELEFONO: "req.session.TELEFONo",
            CORREO: "req.session.CORREo",
            EDAD: "req.session.EDAd",
            SEXO: 'F o M',
            DISTRITO: 'un distrito',
            REGION: 'region'
        });
    }else{
        res.render('/views/login.ejs',{
            login: false
        });
    }
});







module.exports = router;