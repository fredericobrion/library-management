import UserService from '#services/user_service'
import type { HttpContext } from '@adonisjs/core/http'
import mapStatusHTTP from '#utils/map_status_http'
import { inject } from '@adonisjs/core'
import { createUserValidator, loginValidator } from '#validators/user'

export default class UsersController {
  @inject()
  async signup({ request, response }: HttpContext, service: UserService) {
    const payload = await request.validateUsing(createUserValidator)

    const result = await service.createUser(payload)

    response.status(mapStatusHTTP(result.status)).json(result.data)
  }

  @inject()
  async login({ request, response }: HttpContext, service: UserService) {
    const payload = await request.validateUsing(loginValidator)

    const result = await service.login(payload.email, payload.password)

    response.status(mapStatusHTTP(result.status)).json(result.data)
  }
}
