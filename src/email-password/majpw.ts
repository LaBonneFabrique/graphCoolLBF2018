import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'
import * as bcrypt from 'bcryptjs'
import * as validator from 'validator'

interface User {
  id: string
}

interface EventData {
  id: string
  password: string
}

const SALT_ROUNDS = 10

export default async (event: FunctionEvent<EventData>) => {

  try {
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')

    const { id, password } = event.data

    // create password hash
    const salt = bcrypt.genSaltSync(SALT_ROUNDS)
    const hash = await bcrypt.hash(password, salt)

    // create new user
    const userId = await updateGraphcoolUser(api, id, hash)

    // generate node token for new User node
    const token = await graphcool.generateNodeToken(userId, 'User')

    return { data: { id: userId, token } }
  } catch (e) {
    return { error: 'An unexpected error occured during update.' }
  }
}

async function updateGraphcoolUser(api: GraphQLClient, id: string, password: string): Promise<string> {
  const mutation = `
    mutation createGraphcoolUser($id: ID!, $password: String!) {
      updateUser(
        id: $id,
        password: $password
      ) {
        id
      }
    }
  `

  const variables = {
    id,
    password: password,
  }

  return api.request<{ updateUser: User }>(mutation, variables)
    .then(r => r.updateUser.id)
}
