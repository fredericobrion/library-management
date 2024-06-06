import type { HttpContext } from '@adonisjs/core/http'
import BookGenreService from '#services/book_genre_service'
import { inject } from '@adonisjs/core'
import mapStatusHTTP from '#utils/map_status_http'

export default class BookGenresController {
  @inject()
  async store({ request, response }: HttpContext, service: BookGenreService) {
    const payload = request.only(['genre'])

    const result = await service.createGenre(payload.genre)

    response.status(mapStatusHTTP(result.status)).json(result.data)
  }

  @inject()
  async index({ response }: HttpContext, service: BookGenreService) {
    const result = await service.listGenres()

    response.status(mapStatusHTTP(result.status)).json(result.data)
  }

  @inject()
  async show({ response, params }: HttpContext, service: BookGenreService) {
    const result = await service.findGenreById(Number(params.id))

    response.status(mapStatusHTTP(result.status)).json(result.data)
  }

  @inject()
  async update({ request, response, params }: HttpContext, service: BookGenreService) {
    const payload = request.only(['genre'])

    const result = await service.update(Number(params.id), payload.genre)

    response.status(mapStatusHTTP(result.status)).json(result.data)
  }
}
