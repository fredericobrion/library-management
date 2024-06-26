/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const ClientsController = () => import('#controllers/clients_controller')
const BookGenresController = () => import('#controllers/book_genres_controller')
const AuthorsController = () => import('#controllers/authors_controller')
const BooksController = () => import('#controllers/books_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/signup', [UsersController, 'signup'])

router.post('/login', [UsersController, 'login'])

router.resource('clients', ClientsController)

router.resource('genres', BookGenresController)

router.resource('authors', AuthorsController)

router.resource('books', BooksController)
