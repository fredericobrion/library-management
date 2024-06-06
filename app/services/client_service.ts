import { ClientToCreateDto } from '#dto/client_dto'
import Client from '#models/client'
import { ServiceResponse } from '#types/service_response'

export default class ClientService {
  async createClient(data: ClientToCreateDto): Promise<ServiceResponse<Client>> {
    try {
      const clientAlreadyExists = await Client.findBy('email', data.email)
      if (clientAlreadyExists) {
        return { status: 'CONFLICT', data: { error: 'Client already registered' } }
      }

      const client = await Client.create(data)

      return { status: 'CREATED', data: client }
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { error: error.message } }
    }
  }

  async getAllClients(): Promise<ServiceResponse<Client[]>> {
    try {
      const clients = await Client.all()

      return { status: 'OK', data: clients }
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { error: error.message } }
    }
  }

  async getClientById(id: number): Promise<ServiceResponse<Client>> {
    try {
      const client = await Client.find(id)

      if (!client) {
        return { status: 'NOT_FOUND', data: { error: 'Client not found' } }
      }

      return { status: 'OK', data: client }
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { error: error.message } }
    }
  }
}
