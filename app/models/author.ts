import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Book from './book.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Author extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare nationality: string

  @hasMany(() => Book)
  declare books: HasMany<typeof Book>
}
