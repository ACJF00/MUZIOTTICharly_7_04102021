// Imports
const models = require("../models");
const jwtUtils = require("../utils/jwt.utils");

// Constantes
const CONTENT_LIMIT = 40;
const ITEMS_LIMIT = 50;

// Routes
module.exports = {
  createComment: function (req, res) {
    // Getting auth header
    const headerAuth = req.headers["authorization"];
    const userId = jwtUtils.getUserId(headerAuth);

    // Paramètres
    const content = req.body.content;
    const messageId = req.params.messageId;

    models.User.findOne({
      where: { id: userId },
    })
      .then((userFound) => {
        models.Message.findOne({
          where: { id: messageId },
        })
          .then((messageFound) => {
            models.Comment.create({
              userId: userFound.id,
              messageId: messageFound.id,
              username: userFound.username,
              content: content,
            })
              .then((newComment) => res.status(201).json(newComment))
              .catch((err) =>
                res.status(404).json({ error: "comment not added" })
              );
          })
          .catch((err) => res.status(404).json({ error: "Message not found" }));
      })
      .catch((err) => res.status(404).json({ error: "user not found" }));
  },

  listComments: function (req, res) {
    // Getting auth header
    const headerAuth = req.headers["authorization"];

    const messageId = req.params.messageId;

    const fields = req.query.fields;
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    const order = req.query.order;

    models.Message.findOne({
      where: { id: messageId },
    })
      .then((messageFound) => {
        models.Comment.findAll({
          order: [order != null ? order.split(":") : ["createdAt", "DESC"]],
          attributes:
            fields !== "*" && fields != null ? fields.split(",") : null,
          limit: !isNaN(limit) ? limit : null,
          offset: !isNaN(offset) ? offset : null,
          where: { messageId: messageFound.id },
        })
          .then((commentFound) => {
            if (!commentFound.length == 0) {
              res.status(200).json(commentFound);
            } else {
              res.status(404).json({ error: "no comment" });
            }
          })
          .catch((err) => res.status(404).json({ error: "Error" }));
      })
      .catch((err) => res.status(404).json({ error: "No message" }));
    //})
    // .catch(err => res.status(404).json({ error: 'No user' }))
  },

  oneComment: function (req, res) {
    models.Comment.findOne({
      attributes: ["id", "content", "username"],
      where: {
        id: req.params.id,
      },
    })
      .then((comment) => {
        if (comment) {
          res.status(201).json(comment);
        } else {
          res.status(404).json({ error: "comment not found" });
        }
      })
      .catch(function (err) {
        res.status(500).json({ error: "cannot fetch comment" });
      });
  },

  deleteComment: function (req, res) {
    // Getting auth header
    const headerAuth = req.headers["authorization"];
    const userId = jwtUtils.getUserId(headerAuth);

    const comment = models.Comment.findOne({ where: { id: req.params.id } });

    models.Comment.findOne({
      where: { id: req.params.id },
    })
      .then((comment) => {
        if (comment.userId == userId || isAdmin === true) {
          models.Comment.destroy({ where: { id: req.params.id } });
          res.status(200).json({ message: "commentaire supprimé" });
        } else {
          res
            .status(400)
            .json({ message: "Vous n'avez pas les droits requis" });
        }
      })
      .catch((err) =>
        res.status(404).json({ error: "Commentaire non trouvé" })
      );
  },
};
