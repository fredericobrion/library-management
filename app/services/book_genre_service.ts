import BookGenre from '#models/book_genre'
import { ServiceResponse } from '#types/service_response'

export default class BookGenreService {
  async createGenre(genre: string): Promise<ServiceResponse<BookGenre>> {
    try {
      const genreAlreadyExists = await BookGenre.findBy('name', genre)
      if (genreAlreadyExists) {
        return { status: 'CONFLICT', data: { error: 'Genre already registered' } }
      }

      const newGenre = await BookGenre.create({ name: genre })

      return { status: 'CREATED', data: newGenre }
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { error: error.message } }
    }
  }

  async listGenres(): Promise<ServiceResponse<BookGenre[]>> {
    try {
      const genres = await BookGenre.all()
      const sortedGenres = genres.sort((a, b) => a.name.localeCompare(b.name))

      return { status: 'OK', data: sortedGenres }
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { error: error.message } }
    }
  }

  async findGenreById(id: number): Promise<ServiceResponse<BookGenre>> {
    try {
      const genre = await BookGenre.find(id)

      if (!genre) {
        return { status: 'NOT_FOUND', data: { error: 'Genre not found' } }
      }

      return { status: 'OK', data: genre }
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { error: error.message } }
    }
  }

  async update(id: number, genre: string): Promise<ServiceResponse<BookGenre>> {
    try {
      const genreToUpdate = await BookGenre.find(id)

      if (!genreToUpdate) {
        return { status: 'NOT_FOUND', data: { error: 'Genre not found' } }
      }

      genreToUpdate.name = genre
      await genreToUpdate.save()

      return { status: 'OK', data: genreToUpdate }
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { error: error.message } }
    }
  }
}
