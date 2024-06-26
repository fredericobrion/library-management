import Book from '#models/book'
import { ServiceResponse } from '#types/service_response'

export default class BookService {
  async createBook(
    title: string,
    description: string,
    pages: number,
    authorId: number,
    bookGenreId: number
  ): Promise<ServiceResponse<Book>> {
    try {
      const bookAlreadyExists = await Book.findBy('title', title)
      if (bookAlreadyExists) {
        return { status: 'CONFLICT', data: { error: 'Book already registered' } }
      }

      const newBook = await Book.create({ title, description, pages, authorId, bookGenreId })

      return { status: 'CREATED', data: newBook }
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { error: error.message } }
    }
  }

  async listBooks(): Promise<ServiceResponse<Book[]>> {
    try {
      const books = await Book.query().preload('author').preload('bookGenre')
      const sortedBooks = books.sort((a, b) => a.title.localeCompare(b.title))

      return { status: 'OK', data: sortedBooks }
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { error: error.message } }
    }
  }

  async findBookById(id: number): Promise<ServiceResponse<Book>> {
    try {
      const book = await Book.query().where('id', id).preload('author').preload('bookGenre').first()

      if (!book) {
        return { status: 'NOT_FOUND', data: { error: 'Book not found' } }
      }

      return { status: 'OK', data: book }
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { error: error.message } }
    }
  }
}
