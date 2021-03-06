'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', () => {
  return { status: 'It\'s work!' }
})

Route.post('/sessions', 'SessionController.store')

Route.get('/users', 'UserController.index')
Route.post('/users', 'UserController.store')
Route.put('/users/:id', 'UserController.update').middleware('auth')

Route.resource('/posts', 'PostController')
  .apiOnly()
  .except(['index', 'show'])
  .middleware(['auth', 'is:(administrator || moderator)'])

Route.resource('/posts', 'PostController')
  .apiOnly()
  .only(['index', 'show'])
  .middleware(['auth', 'can:(read_posts || read_private_posts)'])

Route.resource('/permissions', 'PermissionController')
  .apiOnly()
  .middleware('auth')

  Route.resource('/roles', 'RoleController')
  .apiOnly()
  .middleware('auth')
