export const localsMiddleware=(req, res, next) =>{
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.loggedInUser;
    console.log(res.locals);
    next();
}