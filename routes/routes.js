const express = require('express');
const connection = require('../database/db');
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
    let citasList = [
        {
            todo: 'Cita medica',
            date: '2021-08-27',
        },
        {
            todo: 'Cita medica',
            date: '2021-08-22',
        },
        {
            todo: 'Cita medica',
            date: '2021-08-21',
        },
        {
            todo: 'Cita medica',
            date: '2021-08-21',
        },
        {
            todo: 'Cita medica',
            date: '2021-08-21',
        }
    ];
    respuesta.render('../views/paciente/index.ejs',{
        login:true,
        NOMBRE: req.session.NOMBRe || 'Manfredo',
        NDOC: req.session.NOMDOC || '74894684',
        NCOR: req.session.CORDOC || 'manfri@gmail.com',
        COLDOC: req.session.COlDOC || 'UNMSM',
        citasList:JSON.stringify(citasList),
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
    let citasList = [
        {
            daysOfWeek: [ '5' ],
            todo: 'Cita médica',
            date: '2021-08-27T19:00:00',
        },
        {
            daysOfWeek: '',
            todo: 'Cita médica',
            date: '2021-08-22T19:00:00',
        },
        {
            daysOfWeek: '',
            todo: 'Cita médica',
            date: '2021-08-21T19:00:00',
        }
    ];
    respuesta.render('../views/paciente/sites/citas.ejs',{
        login:true,
        NOMBRE: req.session.NOMBRe,
        citasList:JSON.stringify(citasList),
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

router.get('/paciente/chat',(peticion,respuesta)=>{
    connection.query('SELECT doc_apellidos, doc_nombres, doc_dni, FROM doctores WHERE doc_dni =?',[peticion.session.DNIDOCTOR1],async(error,results)=>{
        await console.log(peticion.session.DNIDOCTOR1);
        await console.log([{doc_dni:"72865690",doc_apellidos:"GAMARRA SOTO",doc_nombres:"JUAN"}]);
        
        await respuesta.render('../views/paciente/sites/chat.ejs',{dnioculto:peticion.session.DNi,listadoctor:JSON.stringify([{doc_dni:"72865690",doc_apellidos:"GAMARRA SOTO",doc_nombres:"JUAN"}]),NOMBRE:peticion.session.NOMBRe});
       
        
    })
})
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
            respuesta.render('../views/doctor/index.ejs',{
                npacientes:peticion.session.NUMEROPACIENTES
            });
})

router.get('/doctor/informacion',(peticion,respuesta)=>{                            
    respuesta.render('../views/doctor/sites/info.ejs',{
        nombred:peticion.session.NOMBREDOCTOR,
        correod:peticion.session.CORREODOCTOR,
        telefonod:peticion.session.TELEFONODOCTOR,
        dnid: peticion.session.DNIDOCTOR
    });
});

router.get('/doctor/pacientes',(peticion,respuesta)=>{
   
    connection.query('SELECT pac_apellidos, pac_nombres, pac_dni, pac_celular FROM paciente WHERE doc_dni =?',[peticion.session.DNIDOCTOR],async(error,results)=>{
        
        
        
        respuesta.render('../views/doctor/sites/pacientes.ejs',{listapacientes:JSON.stringify(results)});
        
    })
                   
  
});

router.get('/doctor/citas',(peticion,respuesta)=>{
    let citasList = [
        {
            todo: 'Cita medica',
            date: '2021-08-27',
        },
        {
            todo: 'Cita medica',
            date: '2021-08-22',
        },
        {
            todo: 'Cita medica',
            date: '2021-08-21',
        },
        {
            todo: 'Cita medica',
            date: '2021-08-21',
        },
        {
            todo: 'Cita medica',
            date: '2021-08-21',
        }
    ];
    let pacientes = [
        {
            nombre: 'Paola',
            dni: '71545552',
        },
        {
            nombre: 'Andrea',
            dni: '71545552',
        },
        {
            nombre: 'Elvis',
            dni: '71545552',
        },
        {
            nombre: 'Aaron',
            dni: '71545552',
        }
    ]
    console.log(peticion.session.NOMBREDOCTOR);
    respuesta.render('../views/doctor/sites/citas.ejs',{
        dnid: peticion.session.DNIDOCTOR||'1651838',
        pacientes:JSON.stringify(pacientes),
        citasList:JSON.stringify(citasList)});
});

router.get('/doctor/chat',(peticion,respuesta)=>{
    connection.query('SELECT pac_apellidos, pac_nombres, pac_dni, pac_celular FROM paciente WHERE doc_dni =?',[peticion.session.DNIDOCTOR],async(error,results)=>{
        
        
        respuesta.render('../views/doctor/sites/chat.ejs',{dnioculto:peticion.session.DNIDOCTOR,listapacientes:JSON.stringify(results)});
       
        
    })
        
    
});

  //12 auth page
router.get('/doctor/ajustes',(req,res)=>{
    if(req.session.loggedin){
        res.render('../views/doctor/sites/ajustes.ejs',{
            login:true,
            nombred: req.session.NOMBREDOCTOR,
            dnid: req.session.DNIDOCTOR,
            telefonod: req.session.TELEFONODOCTOR,
            correod: req.session.CORREODOCTOR,
            sexod: req.session.SEXODOC,
        });
    }else{
        res.render('/views/login.ejs',{
            login: false
        });
    }
});

router.get('/doctor/logout',(req,res)=>{
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





module.exports = router;