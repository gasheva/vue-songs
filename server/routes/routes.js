const AuthenticationController = require('../controllers/AuthenticationController');
const SongsController = require('../controllers/SongsController');
const BookmarkController = require('../controllers/BookmarkController');
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy');
const isAuthenticated = require('../policies/isAuthenticated');
module.exports = (app)=>{
    app.post('/register', AuthenticationControllerPolicy.register,  AuthenticationController.register),
    app.post('/login', AuthenticationController.login),

    app.get('/songs', SongsController.all),
    app.get('/songs/:id', SongsController.get),
    app.get('/songs/:from&:to', SongsController.getRange),
    app.post('/songs', SongsController.post),

    app.get('/bookmarks', isAuthenticated, BookmarkController.all),
    app.get('/bookmarks/:songId', isAuthenticated, BookmarkController.get),
    app.delete('/bookmarks', isAuthenticated, BookmarkController.delete),
    app.post('/bookmarks', isAuthenticated, BookmarkController.post)
};