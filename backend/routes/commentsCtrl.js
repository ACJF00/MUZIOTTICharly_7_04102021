// Imports
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

// Constantes
const CONTENT_LIMIT = 40;
const ITEMS_LIMIT   = 50;

// Routes
module.exports = {
    createComment: function(req, res) {
        // Getting auth header
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        // Paramètres
        const content = req.body.content;
        const messageId = req.params.messageId;

        models.User.findOne({
            where: { id: userId } 
        })
        .then (userFound => {
            models.Message.findOne({
                where: { id: messageId }
            })
            .then (messageFound => {
                models.Comment.create({
                    userId: userFound.id,
                    messageId: messageFound.id,
                    username: userFound.username,
                    content: content,
                })
                .then(newComment => res.status(201).json(newComment))
                .catch(err => res.status(404).json({ error: 'comment not added' }))
            })
            .catch(err => res.status(404).json({ error: 'Message not found' }))
        })
        .catch(err => res.status(404).json({ error: 'user not found' })) 
    },

    listComments: function(req, res) {
        // Getting auth header
        const headerAuth = req.headers['authorization'];
        //const userId = jwtUtils.getUserId(headerAuth);

        const messageId = req.params.messageId;

        const fields  = req.query.fields;
        const limit   = parseInt(req.query.limit);
        const offset  = parseInt(req.query.offset);
        const order   = req.query.order;
    
        /*models.User.findOne({
            where: { id: userId }
        })*/
        //.then(() => {
            models.Message.findOne({
                where: { id: messageId }
            })
            .then(messageFound => {
                models.Comment.findAll({
                    order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
                    attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
                    limit: (!isNaN(limit)) ? limit : null,
                    offset: (!isNaN(offset)) ? offset : null,
                    where: { messageId: messageFound.id }
                })
                  .then(commentFound => {
                    if (!commentFound.length == 0) {
                      res.status(200).json(commentFound)
                    } else {
                      res.status(500).json({ error: "no comment" })
                    }
                  })
                  .catch(err => res.status(404).json({ error: 'Error' }))
                })
                .catch(err => res.status(404).json({ error: 'No message' }))
            //})
           // .catch(err => res.status(404).json({ error: 'No user' }))
        },

    oneComment: function(req,res) {
    
        models.Comment.findOne({
            attributes: ['id', 'content', 'username'],
            where: { 
              id: req.params.id
             },
             /*include: [
              {
                model: models.Message,
                attributes: [ 'id' ],
              }]*/
        })
        .then(comment => {
            if (comment) {
              res.status(201).json(comment)
            } else {
              res.status(404).json({ 'error': 'comment not found' })
            }
          })
          .catch(function (err) {
            res.status(500).json({ 'error': 'cannot fetch comment' })
          })
    },

    deleteComment: function (req, res) {
        // Getting auth header
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        const comment = models.Comment.findOne({ where: { id: req.params.id }})

        models.Comment.findOne({
            where: { id: req.params.id }
        })
        .then (comment => {
            if (comment.userId == userId || isAdmin === true) {
                models.Comment.destroy({ where: { id: req.params.id }})
                res.status(200).json({ message: "commentaire supprimé" });
            } else {
                res.status(400).json({ message: "Vous n'avez pas les droits requis" });
            }
        })
        .catch(err => res.status(404).json({ error: 'Commentaire non trouvé' })) 
    }
} 




    /*
    /////////////
    deleteComment: function (req, res) {

        // Getting auth header
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        // Paramètres
        const messageId = req.params.messageId;
        const commentId = req.params.commentId

        models.Message.findOne({
            where: {
                id: messageId,
              }
        })
        .then (messageFound => {
            models.Comment.findOne({ 
                where: {
                  id: commentId,
                }
              })
              .then (comment => {
                    if (comment.userId == userId || isAdmin === true) {
                        models.Comment.destroy({ where: {id: req.params.id} })
                          .then(() => res.status(200).json({ message: 'Comment supprimé !'}))
                          .catch(error => res.status(400).json({ error }))
                    } else {
                      res.status(404).json({ 'error': 'Vous n\'avez pas les droits' });
                    }
                    })
                    .catch(error => res.status(500).json({ message: "Comment non trouvé" }));
              })
              .catch(error => res.status(500).json({ message: "Comment non trouvé" }));
        }
    }
    //////////////
    */

        /*asyncLib.waterfall([
            function(done) {
              models.User.findOne({
                where: { id: userId }
              })
              .then(function(userFound) {
                done(null, userFound);
              })
              .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to verify user' });
              });
            },

            function(userFound, done) {
              if(userFound) {
                if (req.file == null) {
                models.Message.create({
                  title: title,
                  content: content,
                  attachment: 0,
                  likes: 0,
                  UserId: userFound.id,
                })
                .then(function(newMessage) {
                  done(newMessage);
                });
              } else {
                models.Message.create({
                    title: title,
                    content: content,
                    attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                    likes: 0,
                    UserId: userFound.id,
                })
                .then(newMessage => res.status(201).json(newMessage))
                console.log(newMessage)
                    .catch(err => res.status(404).json({ error: 'user not found' }))
              }
            }
              else {
                res.status(404).json({ 'error': 'user not found' });
              }
            },
          ], function(newMessage) {
            if (newMessage) {
              return res.status(201).json(newMessage);
            } else {
              return res.status(500).json({ 'error': 'cannot post message' });
            }
          });
        },

        /*listMessages: function(req, res) {
          const fields  = req.query.fields;
          const limit   = parseInt(req.query.limit);
          const offset  = parseInt(req.query.offset);
          const order   = req.query.order;
      
          if (limit > ITEMS_LIMIT) {
            limit = ITEMS_LIMIT;
          }
      
          models.Message.findAll({
            order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [
              {
                model: models.User,
                attributes: ["username", "id"],
              },
              {
                model: models.Like,
                attributes: ["UserId"],
              }]
        })
          .then(messages => {
            if (messages) {
              res.status(200).json(messages);
            } else {
              res.status(404).json({ "error": "no messages found" });
            }
          }).catch(err => {
            console.log(err);
            res.status(500).json({ "error": "invalid fields" });
          });
        },
          oneMessage: function(req,res) {
    
            models.Message.findOne({
                attributes: ['id', 'title', 'content', 'attachment', 'UserId'],
                where: { 
                  id: req.params.id
                 },
                 include: [
                  {
                    model: models.User,
                    attributes: [ 'username' ],
                  }]
            })
            .then(message => {
                if (message) {
                  res.status(201).json(message)
                } else {
                  res.status(404).json({ 'error': 'message not found' })
                }
              })
              .catch(function (err) {
                res.status(500).json({ 'error': 'cannot fetch message' })
              })
        },
        
          /*deleteMessages: function (req, res) {
            models.Message.destroy(
             {
               where: { id: req.paramas.id },
             })
             .then(() => res.status(200).json({ message: "Post supprimé"}))
             .catch(error => res.status(400).json({ error}));
          }*/
         
         
         
         
         
          /*deleteMessages: function (req, res) {

            // Getting auth header
            const headerAuth = req.headers['authorization'];
            const userId = jwtUtils.getUserId(headerAuth);
            //const messageId = req.params.UserId

            const Messages = models.Message;
            const attachment = Messages.attachment;

            
           Messages.findOne({ 
              where: {
                id: req.params.id,
              }
            }) 
            .then(message => {
              if (message.UserId == userId || isAdmin === true) {
                if (attachment !== null) {
                  const filename = message.attachment.split('/images/')[1];
                  fs.unlink(`images/${filename}`, () => {
                    Messages.destroy({ where: {id: req.params.id} })
                    .then(() => res.status(200).json({ message: 'Post et image supprimés !' }))
                    .catch(error => res.status(400).json({ error }))
                  });
                } else {
                  Messages.destroy({ where: {id: req.params.id} })
                    .then(() => res.status(200).json({ message: 'Post supprimé !'}))
                    .catch(error => res.status(400).json({ error }))
                }
              } else {
                res.status(404).json({ 'error': 'Vous n\'avez pas les droits' });
              }
              })
              .catch(error => res.status(500).json({ message: "Post non trouvé" }));
        }
      }*/