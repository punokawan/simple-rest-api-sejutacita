var express = require('express');
var router = express.Router();

const AuthController = require('../controllers/authController');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const checkRoles = require('../middlewares/checkRoles');

/* User Login */
router.post('/login', AuthController.login);

/* Get new Access Token */
router.post('/refresh-token', AuthController.refreshToken);

/* The endpoint below is required to Login */
router.use(auth)

  /* GET user detail */
  router.get('/', userController.getUser);

  /* the endpoint below is required to be an admin role */
  router.use(checkRoles.isAdmin)

    /* GET all users */
    router.get('/all', userController.getAllUser);
    /* GET user by id */
    router.get('/:id', userController.getUserById);
    /* Create user */
    router.post('/', userController.addUser);
    /* Update user by id */
    router.put('/:id', userController.updateUser);
    /* Delete user by id */
    router.delete('/:id', userController.deleteUser);

module.exports = router;
