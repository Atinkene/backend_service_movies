const e = require("express");
const db = require("../models");
const Movie = db.movies;

exports.create = function (req, res) {
    if (!req.body.id) {
        res.status(400).send({ message: "Le contenu ne peut pas être vide !" });
        return;
    }
    const movie = new Movie({
        id: req.body.id,
        nom: req.body.nom,
        genre: req.body.genre,
        synopsis: req.body.synopsis,
        realisateur: req.body.realisateur,
        anneeSortie: req.body.anneeSortie,
    });
    movie
        .save(movie)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors de la création du film.",
            });
        });
};


exports.findAll = (req, res) => {
    const titre = req.query.titre;
    let condition = titre
        ? { titre: { $regex: new RegExp(titre), $options: "i" } }
        : {};
    Movie.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors de la récupération des films.",
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;
    Movie.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: `Aucun film trouvé avec l'ID ${id}`
                });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Erreur lors de la récupération du film avec l'ID ${id}` });
        });
};


exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Les données à mettre à jour ne peuvent pas être vides !",
        });
    }

    const id = req.params.id;
    Movie.findByIdAndUpdate(id, req.body,
        { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(400).send({
                    message: `Impossible de mettre à jour le film avec l'ID = ${id}. Peut-être que le film n'a pas été trouvé`,
                });
            } else res.send({ message: "Le film a été mis à jour avec succès." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la mise à jour du film avec l'ID=" + id,
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Movie.findOneAndDelete({ id: id })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Impossible de supprimer le film avec l'ID=${id}. Peut-être que le film n'a pas été trouvé !`,
                });
            } else {
                res.send({
                    message: "Le film a été supprimé avec succès",
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de supprimer le film avec l'ID=" + id,
            });
        });
};

exports.deleteAll = (req,res) => {
    Movie.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount}
                Le film est supprimé avec succès`,
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est intervenue lors de la suppression des films.",
            });
        });
};
