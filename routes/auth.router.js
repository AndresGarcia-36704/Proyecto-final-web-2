import express from "express";
import passport from "passport";

import { signup } from "../services/auth.service.js";

export const authRouter = express.Router();

// Ruta para mostrar el formulario de login
authRouter.get("/login", (req, res) => {
    res.render("auth/login");
});

// Ruta para mostrar el formulario de registro
authRouter.get("/signup", (req, res) => {
    res.render("auth/signup");
});

// Manejar la autenticación de login con Passport
authRouter.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/auth/login", 
        failureFlash: true, 
    }),
    (req, res) => {
        res.redirect("/makeups/list"); 
    }
);

// Ruta para manejar el logout
authRouter.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/auth/login"); 
    });
});

// Manejar el registro de nuevos usuarios
authRouter.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        await signup(username, password); 
        res.redirect("/auth/login"); 
    } catch (error) {
        console.error(error);
        res.redirect("/auth/signup"); 
    }
});