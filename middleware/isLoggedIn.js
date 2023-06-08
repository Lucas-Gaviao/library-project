function isLoggedIn(req, res, next){
        if(req.session.currentUser){
            //user is logged in
            next();
        } else {
            res.redirect("/login")
        }
}


module.exports = isLoggedIn;