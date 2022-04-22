const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

const { API_KEY, MAIL, DOMAIN, PORT } = process.env;

const mailgun = require("mailgun-js");
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

app.post("/form", (req, res) => {
  try {
    const { firstname, lastname, email, message } = req.fields;
    const data = {
      from: `${firstname} ${lastname} <${email}>`,
      to: MAIL,
      subject: `Message from ${firstname} ${lastname}`,
      text: message,
    };
    mg.messages().send(data, function (error, body) {
      console.log(body);
      console.log(error);
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Page introuvable",
  });
});

app.listen(PORT, () => {
  console.log("Server has started!");
});
