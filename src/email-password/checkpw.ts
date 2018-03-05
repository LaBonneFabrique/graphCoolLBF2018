import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'
import * as bcrypt from 'bcryptjs'
import * as validator from 'validator'

interface allUsers {
  password: string
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

    // get user
    const user: allUsers = await getUser(api, id)
      .then(r => r.allUsers[0])
    
    // check password
    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    return { data: {checkPw: passwordIsCorrect}}
  } catch (e) {
    console.log(e)
    return { error: e + user + ' An unexpected error occured during check.' }
  }
}

async function getUser(api: GraphQLClient, id: string): Promise<{ allUsers }> {
  const query = `
    query getUser($id: ID!) {
      allUsers(filter: {id: $id}) {
        password
      }
    }
  `

  const variables = {
    id
  }

  return api.request<{ allUsers }>(query, variables)
}
