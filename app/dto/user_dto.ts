import { AccessToken } from '@adonisjs/auth/access_tokens'

export class UserToCreateDto {
  constructor(
    public fullName: string,
    public email: string,
    public password: string
  ) {}
}

export class UserCreatedDto {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public token: AccessToken
  ) {}
}
