import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import mapStatusHTTP from '#utils/map_status_http'
import AuthorService from '#services/author_service'

export default class AuthorsController {
  @inject()
  async store({ request, response }: HttpContext, service: AuthorService) {
    const payload = request.only(['name', 'nationality'])

    const result = await service.createAuthor(payload.name, payload.nationality)

    response.status(mapStatusHTTP(result.status)).json(result.data)
  }

  @inject()
  async index({ response }: HttpContext, service: AuthorService) {
    const result = await service.listAuthors()

    response.status(mapStatusHTTP(result.status)).json(result.data)
  }

  @inject()
  async show({ response, params }: HttpContext, service: AuthorService) {
    const result = await service.findAuthorById(Number(params.id))

    response.status(mapStatusHTTP(result.status)).json(result.data)
  }
}
