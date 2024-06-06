import type { HttpContext } from '@adonisjs/core/http'
import ClientService from '#services/client_service'
import { inject } from '@adonisjs/core'
import mapStatusHTTP from '#utils/map_status_http'

export default class ClientsController {
  @inject()
  async store({ request, response }: HttpContext, service: ClientService) {
    const payload = request.only(['name', 'email', 'phone', 'address'])

    const result = await service.createClient(payload)

    response.status(mapStatusHTTP(result.status)).json(result.data)
  }

  @inject()
  async index({ response }: HttpContext, service: ClientService) {
    const result = await service.getAllClients()

    response.status(mapStatusHTTP(result.status)).json(result.data)
  }

  @inject()
  async show({ response, params }: HttpContext, service: ClientService) {
    const result = await service.getClientById(Number(params.id))

    response.status(mapStatusHTTP(result.status)).json(result.data)
  }
}
