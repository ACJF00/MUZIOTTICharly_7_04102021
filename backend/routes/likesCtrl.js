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

/*module.exports = {
  likePost: function(req, res) {
    // Getting auth header
    const headerAuth  = req.headers['authorization'];
    const userId      = jwtUtils.getUserId(headerAuth);

    // Params
    const messageId = parseInt(req.params.messageId);

    if (messageId <= 0) {
      return res.status(400).json({ 'error': 'invalid parameters' });
    }

    asyncLib.waterfall([
      function(done) {
        models.Message.findOne({
          where: { id: messageId }
        })
        .then(function(messageFound) {
          done(null, messageFound);
        })
        .catch(function(err) {
          return res.status(404).json({ 'error': 'unable to verify message' });
        });
      },
      function(messageFound, done) {
        if(messageFound) {
          models.User.findOne({
            where: { id: userId }
          })
          .then(function(userFound) {
            done(null, messageFound, userFound);
          })
          .catch(function(err) {
            return res.status(404).json({ 'error': 'unable to verify user' });
          });
        } else {
          res.status(404).json({ 'error': 'Message pas trouvé' });
        }
      },
      function(messageFound, userFound, done) {
        if(userFound) {
          models.Like.findOne({
            where: {
              userId: userId,
              messageId: messageId,
            }
          })
          .then(function(userAlreadyLikedFound) {
            console.log(messageFound, userFound, userAlreadyLikedFound)
            done(null, messageFound, userFound, userAlreadyLikedFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify is user already liked' });
          });
        } else {
          res.status(404).json({ 'error': 'user not exist' });
        }
      },
      function(messageFound, userFound, userAlreadyLikedFound, done) {
        console.log(userFound)
        if(userFound && userAlreadyLikedFound === null) {
          messageFound.update({
            likes: messageFound.likes + 1,
          }).then(function() {
            done(messageFound);
          }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot update message like counter' });
          });
        } else {
          messageFound.update({
            likes: messageFound.likes - 1,
          }).then(function() {
            done(messageFound);
          }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot update message like counter' });
          });
        }
      },
    ], function(messageFound) {
      if (messageFound) {
        return res.status(201).json(messageFound);
      } else {
        return res.status(500).json({ 'error': 'cannot update message' });
      }
    });
  },
}





  /*dislikePost: function(req, res) {
   // Getting auth header
   const headerAuth  = req.headers['authorization'];
   const userId      = jwtUtils.getUserId(headerAuth);

   // Params
   const messageId = parseInt(req.params.messageId);

   if (messageId <= 0) {
     return res.status(400).json({ 'error': 'invalid parameters' });
   }

   asyncLib.waterfall([
    function(done) {
       models.Message.findOne({
         where: { id: messageId }
       })
       .then(function(messageFound) {
         done(null, messageFound);
       })
       .catch(function(err) {
         return res.status(500).json({ 'error': 'unable to verify message' });
       });
     },
     function(messageFound, done) {
       if(messageFound) {
         models.User.findOne({
           where: { id: userId }
         })
         .then(function(userFound) {
           done(null, messageFound, userFound);
         })
         .catch(function(err) {
           return res.status(500).json({ 'error': 'unable to verify user' });
         });
       } else {
         res.status(404).json({ 'error': 'post already liked' });
       }
     },
     function(messageFound, userFound, done) {
       if(userFound) {
         models.Like.findOne({
           where: {
             userId: userId,
             messageId: messageId,
           }
         })
         .then(function(userAlreadyLikedFound) {
            done(null, messageFound, userFound, userAlreadyLikedFound);
         })
         .catch(function(err) {
           return res.status(500).json({ 'error': 'unable to verify is user already liked' });
         });
       } else {
         res.status(404).json({ 'error': 'user not exist' });
       }
     },
     function(messageFound, userFound, userAlreadyLikedFound, done) {
      if(!userAlreadyLikedFound) {
        messageFound.addUser(userFound, { isLike: DISLIKED })
        .then(function (alreadyLikeFound) {
          done(null, messageFound, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to set user reaction' });
        });
      } else {
        if (userAlreadyLikedFound.isLike === LIKED) {
          userAlreadyLikedFound.update({
            isLike: DISLIKED,
          }).then(function() {
            done(null, messageFound, userFound);
          }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot update user reaction' });
          });
        } else {
          res.status(409).json({ 'error': 'message already disliked' });
        }
      }
     },
     function(messageFound, userFound, done) {
       messageFound.update({
         likes: messageFound.likes - 1,
       }).then(function() {
         done(messageFound);
       }).catch(function(err) {
         res.status(500).json({ 'error': 'cannot update message like counter' });
       });
     },
   ], function(messageFound) {
     if (messageFound) {
       return res.status(201).json(messageFound);
     } else {
       return res.status(500).json({ 'error': 'cannot update message' });
     }
   });
  }*/
