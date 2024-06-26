import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Author from './author.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BookGenre from './book_genre.js'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare pages: number

  @column()
  declare authorId: number

  @belongsTo(() => Author)
  declare author: BelongsTo<typeof Author>

  @column({ columnName: 'book_genre_id' })
  declare bookGenreId: number

  @belongsTo(() => BookGenre)
  declare bookGenre: BelongsTo<typeof BookGenre>
}
