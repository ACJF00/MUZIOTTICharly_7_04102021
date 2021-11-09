//Imports
const models   = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const asyncLib = require('async');

// Constants
const DISLIKED = 0;
const LIKED    = 1;

// Routes
/*module.exports = {
likePost: function(req, res) {
  models.Message.findOne({
    where: {
      userId: userId,
      messageId: messageId,
    }
  })
  .then((message) => {
    if (req.body.like === 1){
      if (!message.usersLiked.includes(req.body.userId)){
        message.usersLiked.push(req.body.userId)
        message.likes++;
        message.save()
        .then(() => res.status(201).json({ message: "Sauce likée" }))
        .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(403).json({ message: "You can't like the same sauce twice"})
        .catch((error) => res.status(400).json({ error }));
      }
    }
  
    else if (req.body.like === -1) {
      if (!message.usersDisliked.includes(req.body.userId)){
        message.usersDisliked.push(req.body.userId)
        message.dislikes++;
        message.save()
        .then(() => res.status(201).json({ message: "Sauce dislikée" }))
        .catch((error) => res.status(400).json({ error }));
      }
      else {
        res.status(403).json({ message: "You can't dislike the same sauce twice"})
        .catch((error) => res.status(400).json({ error }));
      }
    } 

    else if (req.body.like === 0) {
      if (message.usersLiked.includes(req.body.userId)){
        message.usersLiked.pull(req.body.userId)
        message.likes--
        message.save()
        .then(() => res.status(201).json({ message: "Sauce unlikée" }))
        .catch((error) => res.status(400).json({ error }));
      } else if (message.usersDisliked.includes(req.body.userId)) {
        message.usersDisliked.pull(req.body.userId)
        message.dislikes--;
        message.save()
        .then(() => res.status(201).json({ message: "Sauce undislikée" }))
        .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(403).json({ message: "You didn't interact with the sauce yet"})
        .catch((error) => res.status(400).json({ error }));
      }
    }
  })
  .catch((error) => res.status(500).json({ error }));
}
}*/



module.exports = {
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
        if(userAlreadyLikedFound === null) {
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
}