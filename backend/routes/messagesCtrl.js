// Imports
const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils');

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
        const attachment = req.body.attachment;

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
                models.Message.create({
                  title  : title,
                  content: content,
                  likes  : 0,
                  UserId : userFound.id
                })
                .then(function(newMessage) {
                  done(newMessage);
                });
              } else {
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
              order: [(order != null) ? order.split(':') : ['createdAt', 'ASC']],
              attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
              limit: (!isNaN(limit)) ? limit : null,
              offset: (!isNaN(offset)) ? offset : null,
              include: [{
                model: models.User,
                attributes: [ 'username' ]
              }]
            }).then(function(messages) {
              if (messages) {
                res.status(200).json(messages);
              } else {
                res.status(404).json({ "error": "no message found" });
              }
            }).catch(function(err) {
              console.log(err);
              res.status(500).json({ "error": "invalid fields" });
            });
          }
        }