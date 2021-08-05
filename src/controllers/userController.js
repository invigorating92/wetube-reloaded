
export const edit = (req, res) => res.send("User profile Edit");
export const login = (req, res) => res.render("login", {pageTitle:"Login"});
export const deleteProfile = (req, res) => res.send("User Profile Delete");
export const join = (req, res) => res.send("User Join Page");
export const seeUser = (req, res) => res.send(`User ID: ${req.params.id}`);
export const logout = (req, res) => res.send("Logout");