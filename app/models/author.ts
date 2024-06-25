import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Author extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare nationality: string
}
