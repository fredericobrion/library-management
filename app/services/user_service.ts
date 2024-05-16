import User from '#models/user'
import { ServiceResponse } from '#types/service_response'
import { UserToCreateDto, UserCreatedDto } from '#dto/user_dto'
import { AccessToken } from '@adonisjs/auth/access_tokens'

export default class UserService {
  async createUser(data: UserToCreateDto): Promise<ServiceResponse<UserCreatedDto>> {
    try {
      const userAlreadyExists = await User.findBy('email', data.email)
      if (userAlreadyExists) {
        return { status: 'CONFLICT', data: { error: 'User already registered' } }
      }

      const user = await User.create(data)

      const token = await User.accessTokens.create(user)

      const createdUser = new UserCreatedDto(user.id, user.fullName, user.email, token)

      return { status: 'CREATED', data: createdUser }
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { error: error.message } }
    }
  }

  async login(email: string, password: string): Promise<ServiceResponse<AccessToken>> {
    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    return { status: 'OK', data: token }
  }
}
