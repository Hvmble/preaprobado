const { Router } = require('express')

// const { usersGet, usersPut, usersPost, usersDelete, usersPatch, clientsGet } = require('../controllers/users')
const {clientsGet, clientsPost, clientsGetOne } = require('../controllers/clients')

const router = Router()
// router.get('/', clientsGet)
router.get('/:id', clientsGetOne)
router.post('/', clientsPost);

module.exports = router
