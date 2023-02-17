const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
require("dotenv").config();
app.use(cors());

const apiAdress = "https://lereacteur-marvel-api.herokuapp.com";
const apiKey = process.env.MARVEL_API_KEY;

const httpAdressRender = (params) => `${apiAdress}/${params}apiKey=${apiKey}`;

app.get("/", (req, res) => {
  try {
    return res.status(200).json("Bienvenue sur notre serveur Marvel 🍣");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.get("/comics", async ({ query }, res) => {
  let filters = "?";

  if (query) {
    Object.entries(query).forEach(([key, val]) => {
      if (val) {
        filters += `${key}=${val}&`;
      }
    });
  }

  try {
    const { data } = await axios.get(httpAdressRender(`comics${filters}`));

    res.status(200).json({ message: data });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.get("/characters", async ({ query }, res) => {
  let filters = "?";

  if (query) {
    Object.entries(query).forEach(([key, val]) => {
      if (val) {
        filters += `${key}=${val}&`;
      }
    });
  }

  try {
    const { data } = await axios.get(httpAdressRender(`characters${filters}`));
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.get("/comics/:id", async ({ params }, res) => {
  try {
    const { data } = await axios.get(httpAdressRender(`comics/${params.id}?`));

    res.status(200).json({ message: data });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.get("/character/:id", async ({ params }, res) => {
  try {
    const { data } = await axios.get(
      httpAdressRender(`character/${params.id}?`)
    );

    res.status(200).json({ message: data });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.all("*", (req, res) => {
  res.status(404).send("Page introuvable");
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
