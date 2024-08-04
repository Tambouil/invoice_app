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
const QuotationController = () => import('#controllers/quotation_controller')

// Home
router.on('/').renderInertia('home')

// Clients
router.get('/clients', [ClientController, 'index'])
router.post('/clients', [ClientController, 'store'])
router.get('/clients/create', [ClientController, 'create'])
router.get('/clients/:id', [ClientController, 'show'])
router.put('/clients/:id', [ClientController, 'update'])
router.delete('/clients/:id', [ClientController, 'destroy'])

// Quotations
router.get('/quotations', [QuotationController, 'index'])
router.post('/quotations', [QuotationController, 'store'])
router.get('/quotations/create', [QuotationController, 'create'])
router.get('/quotations/:id', [QuotationController, 'show'])
router.put('/quotations/:id', [QuotationController, 'update'])
router.delete('/quotations/:id', [QuotationController, 'destroy'])
