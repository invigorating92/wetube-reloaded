import User from "../models/User";
import bcrypt from "bcrypt";


export const edit = (req, res) => res.send("User profile Edit");
export const getLogin = (req, res) => {
   return res.render("login", {pageTitle:"Login"});
}
export const postLogin = async (req, res) =>{
    const {username, password} = req.body;
    const pageTitle = "Login";
    const existUsername = await User.exists({username});
    if(!existUsername){
        return res.status(400).render("login", {pageTitle, errorMessage:"This username does not exist." })
    }
    const savedUser = await User.findOne({username});
    const comparePassword = await bcrypt.compare(password, savedUser.password);
    if(!comparePassword){
        return res.status(400).render("login", {pageTitle, errorMessage:"Password is wrong."})
    }
    console.log("Log In Complete!!");
    req.session.loggedIn = true;
    req.session.loggedInUser = savedUser;
    return res.redirect("/");
    
};
export const deleteProfile = (req, res) => res.send("User Profile Delete");
export const getJoin = (req, res) =>{
 return res.render("join", {pageTitle: "Create Account"} );
}
export const postJoin = async (req, res) =>{
    console.log(req.body);
   const {name, username, email, password, password2, location} = req.body;
   const exist = await User.exists({$or :[{username}, {email}]});
    if(exist){
        return res.status(400).render("join", {pageTitle:"Create Account", errorMessage: "Already existed username/email. Please use another username/email."})   
    }
    if(password !== password2){
        return res.render("join", {pageTitle: "Create Account", errorMessage:"Passwords do not match."})
    }
    try{
        await User.create({
            name, username, email, password, location,
         });
         console.log(req.session);
        return res.redirect("/login");
    }catch(eroor){
        return res.status(400).render("join", {pageTitle: "Create Account", errorMessage:error_message});
    }   
}; 
export const seeUser = (req, res) => res.send(`User ID: ${req.params.id}`);
export const logout = (req, res) => res.send("Logout");