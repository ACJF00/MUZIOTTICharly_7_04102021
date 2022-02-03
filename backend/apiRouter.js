// Imports
const express = require('express');
const usersCtrl = require('./routes/usersCtrl');
const messagesCtrl = require('./routes/messagesCtrl');
const multer = require('./middleware/multer-config');
const likesCtrl = require('./routes/likesCtrl');
const commentsCtrl = require('./routes/commentsCtrl');


// Router
exports.router = (function() {
    const apiRouter = express.Router();

    // Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/infos/').get(usersCtrl.getUserProfile);
    apiRouter.route('/users/:id/').delete(usersCtrl.deleteUserProfile);
    apiRouter.route('/users/:id/edit').put(usersCtrl.updateUserProfile);
    apiRouter.route('/users/').get(usersCtrl.getAllUsers);

    // Messages routes
    apiRouter.route('/messages/new/').post(multer, messagesCtrl.createMessage);
    apiRouter.route('/messages/').get(multer, messagesCtrl.listMessages);
    apiRouter.route('/messages/:id/').get(multer, messagesCtrl.oneMessage);
    apiRouter.route('/messages/:id/').delete(multer, messagesCtrl.deleteMessages);

    //Likes
   apiRouter.route('/messages/:messageId/vote/like').post(likesCtrl.likePost);

   //Comments
   apiRouter.route('/messages/:messageId/comment/new').post( commentsCtrl.createComment);
   apiRouter.route('/messages/:messageId/comments/').get(multer, commentsCtrl.listComments);
   apiRouter.route('/messages/comment/:id').get( commentsCtrl.oneComment);
   apiRouter.route('/messages/comment/:id').delete( commentsCtrl.deleteComment);

    return apiRouter;
})();



