import { getUserId } from './../utils'

// we need to use fragment since we need id to be always available in parent
// even if it is not requested by the client
const User = {
   email: {
      fragment: 'fragment userId on User {id}',
      resolve(parent, args, { request }, info) {
         const userId = getUserId(request, false)
   
         if (userId && userId === parent.id) {
            return parent.email
         } else {
            return null
         }
      }
   }
}

export default User