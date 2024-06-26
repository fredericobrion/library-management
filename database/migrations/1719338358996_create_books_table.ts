import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('title').notNullable()
      table.string('description').notNullable()
      table.integer('pages').notNullable()
      table.integer('author_id').unsigned().references('authors.id').onDelete('CASCADE')
      table.integer('book_genre_id').unsigned().references('book_genres.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
