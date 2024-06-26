import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import mapStatusHTTP from '#utils/map_status_http'
import BookService from '#services/book_service'

export default class BooksController {
  @inject()
  async store({ request, response }: HttpContext, service: BookService) {
    const payload = request.only(['title', 'authorId', 'bookGenreId', 'pages', 'description'])

    const result = await service.createBook(
      payload.title,
      payload.description,
      payload.pages,
      payload.authorId,
      payload.bookGenreId
    )

    response.status(mapStatusHTTP(result.status)).json(result.data)
  }

  @inject()
  async index({ response }: HttpContext, service: BookService) {
    const result = await service.listBooks()

    response.status(mapStatusHTTP(result.status)).json(result.data)
  }

  @inject()
  async show({ response, params }: HttpContext, service: BookService) {
    const result = await service.findBookById(params.id)

    response.status(mapStatusHTTP(result.status)).json(result.data)
  }
}
