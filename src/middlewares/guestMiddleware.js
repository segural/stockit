// Verifica si hay un usuario loggeado y si lo hay redirecciona al perfil de ese usuario loggeado.
// Se usa en rutas que sólo pueden accederse si No se está loggeado.

function guestMiddleware (req, res, next){
    if(req.session.userLogged == undefined){
        next();
    } else{
        res.redirect("/index")
    };

};

module.exports = guestMiddleware;