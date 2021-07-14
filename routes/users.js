var express = require('express');
const AuthController = require('../controllers/authController');
var router = express.Router();

const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);

router.use(auth)
/* GET user detail. */
router.get('/', userController.getUser);
router.get('/all', userController.getAllUser);
router.get('/:id', userController.getUserById);
router.post('/', userController.addUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);




module.exports = router;