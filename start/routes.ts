/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const ClientController = () => import('#controllers/client_controller')

// Home
router.on('/').renderInertia('home')

// Clients
router.get('/clients', [ClientController, 'index'])
router.post('/clients', [ClientController, 'store'])
router.get('/clients/create', [ClientController, 'create'])

router.get('/clients/:id', [ClientController, 'show'])
router.put('/clients/:id', [ClientController, 'update'])
router.delete('/clients/:id', [ClientController, 'destroy'])
