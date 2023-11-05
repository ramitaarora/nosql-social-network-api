const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require ('../../controllers/userController');

router.route('/')
    .get(getUsers)
    .post(createUser)
    .delete(deleteUser);

router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser);

module.exports = router;
