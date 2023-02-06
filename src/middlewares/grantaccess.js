

// const { roles } = require('../security/roles')
 
// export default function(action:any, resource:any) {
//  return async (req: any, res: any, next: any) => {
//   try {
//    const permission = roles.can(req?.user?.role)[action](resource);
// //    console.log(permission,"permission: ")
//    if (!permission.granted) {
//     return res.status(401).json({
//      error: "You don't have enough permission to perform this action"
//     });
//    }
//    next()
//   } catch (error) {
//    next(error)
//   }
//  }
// }
