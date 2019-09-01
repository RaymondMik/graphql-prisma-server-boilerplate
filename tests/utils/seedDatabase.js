import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'
import ApolloBoost from 'apollo-boost'

/**
 * Generate users
 */
export const UserOne = {
    payloadInfo: {
        name: 'Joe',
        email: 'joe@test.org',
        password: bcrypt.hashSync('oilP99!?^-', bcrypt.genSaltSync(10))
    },
    data: undefined,
    jwt: undefined
}

export const UserTwo = {
    payloadInfo: {
        name: 'Mike',
        email: 'mike@test.org',
        password: bcrypt.hashSync('heyHo199!?^-', bcrypt.genSaltSync(10))
    },
    data: undefined,
    jwt: undefined
}

/**
 * Provide ApolloBoost client object
 * @param {String} jwt 
 */
export const getClient = (jwt) => 
    new ApolloBoost({ 
        uri: 'http://localhost:4000',
        request(operation) {
            if (jwt) {
                operation.setContext({
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                })
            }
        }
    })

/**
 * Prep DB with data needed for testing - designed to be run beforeEach()
 */
export const seedDatabase = async () => {
   UserOne.data = await prisma.mutation.createUser({ data: UserOne.payloadInfo })
   UserOne.jwt = jwt.sign({ userId: UserOne.data.id }, process.env.JWT_SECRET)

   UserTwo.data = await prisma.mutation.createUser({ data: UserTwo.payloadInfo })
   UserTwo.jwt = jwt.sign({ userId: UserTwo.data.id }, process.env.JWT_SECRET)
}

export default seedDatabase