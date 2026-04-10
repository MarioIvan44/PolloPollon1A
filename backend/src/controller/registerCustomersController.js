//nodemailler: envía correos con SMTP
//crypto: generar código aleatorio
//jsonwebtoken: generar token
//bcryptjs: encriptar contraseña

import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

const registerCustomersController = {};
import customerModel from "../models/customer.js";
import { config } from "../../config.js";

registerCustomersController.register = async (req, res) => {
  const {
    name,
    lastName,
    birthdate,
    email,
    password,
    isVerified,
    loginAttempts,
    timeOut,
  } = req.body; //Pedimos todos los datos que se van a insertar

  try {
    //Verificar si el cliente si ya existe
    const existCustomer = await customerModel.findOne({ email });
    //Si el cliente ya existe, enviamos un mensaje de error
    if (existCustomer) {
      return res.status(400).json({ message: "Customer already exist" });
    }

    //Bcryptjs utiliza un algoritmo de encriptación llamado bcrypt, que es un algoritmo de hashing adaptativo diseñado para ser lento y resistente a ataques de fuerza bruta.
    //El número 10 es el número de rondas de encriptación, mientras más alto sea el número, más segura será la contraseña, pero también tardará más tiempo en encriptar
    const passwordHash = await bcrypt.hash(password, 10);

    //Generar un token de verificación
    const verificationCode = crypto.randomBytes(3).toString("hex"); //Genera un código aleatorio de 3 bytes y lo convierte a una cadena hexadecimal

    //Generamos un token para guardar el código aleatorio
    const tokenCode = jsonwebtoken.sign(
      //1.- ¿Qué vamos a guardar?
      {
        email,
        verificationCode,
        name,
        lastName,
        birthdate,
        passwordHash, //Guardamos la contraseña encriptada
        isVerified,
        loginAttempts,
        timeOut,
      },
      //2.- Secret key
      config.JWT.secret,
      //3.- ¿Cuándo expira?
      { expiresIn: "15m" },
    );

    res.cookie("verificationToken", tokenCode, { maxAge: 15 * 60 * 1000 }); //15 minutos, el token pide en milisegundos
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Enviar ese código por correo
    //1. Quién envía ese código por correo
    //Transporter es quien manda el correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password,
      },
    });

    //2. mailOptions -> quién lo recibe?
    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "Verificación de cuenta",
      text:
        "Para verificar tu cuenta, utiliza este código" +
        verificationCode +
        " Ten en cuenta que expira en 15 minutos",
    };

    //3. Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error: " + error);
        return res.status(500).json({ message: "error" });
      }
      res
        .status(200)
        .json({ message: "Customer registered, verify your email" });
    });
  } catch (error) {
    console.log("error: " + error);
    return res
      .status(500)
      .json({ message: "Error registering customer: Internal server error" });
  }

 
};

//Verificamos el código que le acabamos de enviar
registerCustomersController.verifyCode = async (req, res) => {
  try {
    //1. Solicitamos el código que escribieron en el frontend
    const { verificationCodeRequest } = req.body;

    //2. Obtener el  token de las cookies
    const token = req.cookies.verificationToken;

    //3. Ver que código tiene el token
    // jsonwebtoken.verify returns the decoded payload 
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const {
      email,
      verificationCode: storedCode,
      lastName,
      birthdate,
      passwordHash,
      isVerified,
      loginAttempts,
      timeOut,
    } = decoded;

    //Paso final: comparar el código que el usuario escribe
    //con el código que está en el token

    if (verificationCodeRequest !== storedCode) {
      return res.status(400).json({ message: "invalid code" });
    }

    //si el código está bien, entonces, colocamos el campo de "isVerified" en true
    const newCustomer = new customerModel({
      lastName,
      birthdate,
      email,
      passwordHash,
      isVerified: true,
      loginAttempts,
      timeOut,
    });

    //Guardamos los datos
    await newCustomer.save();

    res.clearCookie("verificationToken");

    res.json({ message: "Email verified succesfully" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal serer error" });
  }
};

export default registerCustomersController;
