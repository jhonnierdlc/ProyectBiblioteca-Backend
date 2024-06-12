const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client("672309472051-3iacjdib48bg0oi56n8m7b57l2s0prp3.apps.googleusercontent.com");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Inicio Sesion Exitoso" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/google", async (req, res) => {
  const { tokenId } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: "672309472051-3iacjdib48bg0oi56n8m7b57l2s0prp3.apps.googleusercontent.com",
    });

    const { email, name, picture, sub: googleId } = ticket.getPayload();
    const [firstName, lastName] = name.split(" ");

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, firstName, lastName, googleId, picture });
      await user.save();
    }

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Inicio de Sesión con Google Exitoso" });
  } catch (error) {
    res.status(400).send({ message: "Error al autenticar con Google" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
