const express = require("express");
const app = express();
const logger = require("morgan");
const PORT = process.env.PORT || 4000;
const db = require("./models");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require("./routes/movie.routes")(app);

db.mongoose
  .connect(db.url)
  .then(() => {
    console.log(`Connecté à la base de données '${db.url}' !`);
  })
  .catch(err => {
    console.log(`Impossible de se connecter à la base de données '${db.url}' !`, err);
    process.exit();
  });

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue dans l'application de films." });
});

app.listen(PORT, () => {
  console.log(`Serveur Express backend en cours d'exécution sur le port ${PORT}.`);
});
