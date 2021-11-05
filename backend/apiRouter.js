// Imports
const express = require('express');
const usersCtrl = require('./routes/usersCtrl');
const messagesCtrl = require('./routes/messagesCtrl');
const multer = require('./middleware/multer-config');
const likesCtrl = require('./routes/likesCtrl');


// Router
exports.router = (function() {
    const apiRouter = express.Router();

    // Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/infos/').get(usersCtrl.getUserProfile);
    apiRouter.route('/users/:id/').delete(usersCtrl.deleteUserProfile);
    //apiRouter.route('/users/me/').put(usersCtrl.updateUserProfile);

    // Messages routes
    apiRouter.route('/messages/new/').post(multer, messagesCtrl.createMessage);
    apiRouter.route('/messages/').get(multer, messagesCtrl.listMessages);
    apiRouter.route('/messages/:id/').get(multer, messagesCtrl.oneMessage);
    //apiRouter.route('/messages/:id/').put(multer, messagesCtrl.updateMessage);
    apiRouter.route('/messages/:id/').delete(multer, messagesCtrl.deleteMessages);

    //Likes
   apiRouter.route('/messages/:messageId/vote/like').post(likesCtrl.likePost);
   //apiRouter.route('/messages/:messageId/vote/dislike').post(likesCtrl.dislikePost);

    return apiRouter;
})();



