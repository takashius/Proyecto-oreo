const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { PAGE_URL } = require('../config');

usersRouter.post('/', async (request, response) => {
    const { name, email, selector, telefono, password } = request.body
    

    if (!name || !email || !telefono || !selector || !password) {
        return response.status(400).json({ error: 'Todos los espacio son requeridos' });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        return response.status(400).json({ error: 'El email ya se encuentra en uso' });
    }


 const saltRounds = 10;

 const passwordHash = await bcrypt.hash(password, saltRounds);
 
 const newUser = new User({
    name,
    email,
    telefono: `${selector}${telefono}`,
    passwordHash,
 });

 const savedUser = await newUser.save();
 const token = jwt.sign({ id: savedUser.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1m'
 });
 
 const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


    await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: savedUser.email, // list of receivers
      subject: 'verficacion de usuario', // Subject line
      html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verificar correo</a>`, // html body
    });

    return response.status(201).json('Usuario creado. Por favor verifica tu correo');

  
});


usersRouter.patch('/:id/:token', async (request, response) => {
  try {
    const token = request.params.token;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decodedToken.id;
    await User.findByIdAndUpdate(id, { verified: true });
    return response.sendStatus(200)
  } catch (error) {
    // Encontrar el Email del usuario
    const id = request.params.id;
    const { email } = await User.findById(id);

    // Firmar el nuevo token 
    const token = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1m'
   });

   // Enviar el email
   const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
      await transporter.sendMail({
        from: process.env.EMAIL_USER, // sender address
        to: email, // list of receivers
        subject: 'verficacion de usuario', // Subject line
        html: `
        <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        p {
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            color: #ffffff;
            background-color: #007BFF;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #0056b3;
        }
        footer {
            text-align: center;
            padding: 10px;
            font-size: 0.9em;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hola, [Nombre]</h1>
        <p>
            Este es un ejemplo de un correo electrónico simple pero moderno utilizando HTML y CSS.
            Puedes personalizar este diseño según tus necesidades.
        </p>
        <p>
            Haz clic en el siguiente botón para continuar:
        </p>
        <a class="button" href="${PAGE_URL}/verify/${id}/${token}">Verificar correo</a>
    </div>
    <footer>
       Oreo_Tohari
    </footer>
</body>
</html>
        
        `, // html body
      });

    return response.status(400).json({ error: 'El link ya expiro. Se ha enviado un nuevo link de verificacion a su correo' });
  }
});


module.exports = usersRouter;