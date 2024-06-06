import { BaseSeeder } from '@adonisjs/lucid/seeders'
import BookGenre from '#models/book_genre'

export default class extends BaseSeeder {
  async run() {
    await BookGenre.createMany([
      { name: 'Fantasy' },
      { name: 'Science Fiction' },
      { name: 'Dystopian' },
      { name: 'Mystery' },
      { name: 'Horror' },
      { name: 'Thriller' },
      { name: 'Suspense' },
      { name: 'Historical Fiction' },
      { name: 'Romance' },
      { name: "Children's" },
      { name: 'Autobiography' },
      { name: 'Biography' },
      { name: 'Art' },
      { name: 'Photography' },
      { name: 'Food & Drink' },
      { name: 'Self-help' },
      { name: 'Travel' },
      { name: 'Humor' },
      { name: 'Religion' },
    ])
  }
}
