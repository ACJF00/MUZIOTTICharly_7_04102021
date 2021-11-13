// Imports
const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils');
const fs = require('fs');
const message = require('../models/message');

// Constantes
const TITLE_LIMIT = 1;
const CONTENT_LIMIT = 40;
const ITEMS_LIMIT   = 50;

// Routes
module.exports = {
    createMessage: function(req, res) {
        // Getting auth header
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        // Paramètres
        const title = req.body.title;
        const content = req.body.content;


       /* if (title == '' ||  content == '') {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
      /*  if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
            return res.status(400).json({ 'error': 'invalid parameters' });
        }*/

        asyncLib.waterfall([
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

        listMessages: function(req, res) {
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
                attributes: ['id', 'title', 'content', 'attachment', 'UserId', 'likes'],
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
        
          deleteMessages: function (req, res) {

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
      }