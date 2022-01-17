//Imports
const models   = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const asyncLib = require('async');

// Constants
const DISLIKED = 0;
const LIKED    = 1;

// Routes

const liked = 1
const disliked = -1

// Routes
module.exports = {
  // LIKE, UNLIKE Message  ***********************************************************************

    likePost: function(req, res) {
        const headerAuth = req.headers['authorization']
        const userId     = jwtUtils.getUserId(headerAuth)

        const messageId = req.params.messageId
        
        models.Message.findOne({ where: { id: messageId }})
        .then(messageFound => {
            models.Like.findOne({
                where: {
                    messageId: messageFound.id,
                    userId: userId
                }
            })
            .then(likeFound => {
                if (!likeFound) {
                    models.Like.create({
                        messageId: messageId,
                        userId: userId,
                    })
                    .then(() => {
                        messageFound.update({
                            likes: messageFound.likes + liked
                        })
                        .then(() => {
                            return res.status(201).json({ 'message': 'Message liked !', likeFound })
                        })
                        .catch(error => {
                            res.status(400).json({ error })
                        })
                    })
                    .catch(error => {
                        res.status(500).json({ 'message': 'Message already liked !' })
                    })
                } else {
                    likeFound.destroy()
                    .then(() => {
                        messageFound.update({
                            likes: messageFound.likes + disliked
                        })
                        .then(() => {
                            res.status(201).json({ 'message': 'I no longer like this message !', likeFound })
                        })
                        .catch(error => {
                            res.status(400).json({ error })
                        })
                    })
                    .catch(() => {
                        res.status(500).json({ 'message': 'Unable to dislike message !' })
                    })
                }
            })
            .catch(error => {
                res.status(404).json({ 'message': 'Unable to find like !' })
            })
        })
        .catch(error => {
            res.status(400).json({ message: 'unable to find message !' })
        })
      }
    }
