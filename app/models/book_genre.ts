import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Book from './book.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class BookGenre extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @hasMany(() => Book)
  declare books: HasMany<typeof Book>
}
