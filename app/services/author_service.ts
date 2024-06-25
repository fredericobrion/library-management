import Author from '#models/author'
import { ServiceResponse } from '#types/service_response'

export default class AuthorService {
  async createAuthor(name: string, nationality: string): Promise<ServiceResponse<Author>> {
    try {
      const authorAlreadyExists = await Author.findBy('name', name)
      if (authorAlreadyExists) {
        return { status: 'CONFLICT', data: { error: 'Author already registered' } }
      }
      const newAuthor = await Author.create({ name, nationality })
      return { status: 'CREATED', data: newAuthor }
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { error: error.message } }
    }
  }

  async listAuthors(): Promise<ServiceResponse<Author[]>> {
    try {
      const authors = await Author.all()
      const sortedAuthors = authors.sort((a, b) => a.name.localeCompare(b.name))
      return { status: 'OK', data: sortedAuthors }
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { error: error.message } }
    }
  }

  async findAuthorById(id: number): Promise<ServiceResponse<Author>> {
    try {
      const author = await Author.find(id)
      if (!author) {
        return { status: 'NOT_FOUND', data: { error: 'Author not found' } }
      }
      return { status: 'OK', data: author }
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { error: error.message } }
    }
  }
}
