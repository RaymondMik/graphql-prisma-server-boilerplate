import bcrypt from 'bcrypt'
import { getUserId, getJwt, hashPassword } from './../utils'

const Mutation = {
   async createUser(parent, args, { prisma }, info) {
      // check if entered email is unique
      const isEmailTaken = await prisma.exists.User({ email: args.data.email })
      
      if (isEmailTaken) throw new Error('email already taken')

      const password = await hashPassword(args.data.password)

      const user = await prisma.mutation.createUser({ 
         data: {
            ...args.data,
            password
         }
      })

      return {
         user,
         token: getJwt(user.id, '7 days')
      }
   },
   async loginUser(parent, args, { prisma }, info) {
      const user = await prisma.query.user({
         where: {
            email: args.data.email
         }
      })

      const doesPwdMatches = await bcrypt.compare(args.data.password, user.password)
      if (!user || !doesPwdMatches) throw new Error('unable to login')

      return {
         user,
         token: getJwt(user.id, '7 days')
      }
   },
   async deleteUser(parent, args, { prisma, request }, info) {
      const userId = getUserId(request)

      // check if user exists
      const doesUserExist = await prisma.exists.User({ id: userId })
      if (!doesUserExist) throw new Error('user does not exist')

      return prisma.mutation.deleteUser({ 
         where: {
            id: args.id 
         }
      }, info)
   },
   async updateUser(parent, args, { prisma, request }, info) {
      const userId = getUserId(request)

      if (typeof args.data.password === 'string') {
         args.data.password = await hashPassword(args.data.password)
      }

      return prisma.mutation.updateUser({ 
         where: { id: userId }, 
         data: args.data
      }, info)
   }
};

export default Mutation