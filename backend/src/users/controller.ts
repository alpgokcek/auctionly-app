import { Request, Response } from "express";
import * as admin from 'firebase-admin'


//register
export async function createUser(req: Request, res: Response) {
   try {
       const { displayName, password, disabled, email, role } = req.body

       const { uid } = await admin.auth().createUser({
           displayName,
           password,
           email,
           disabled
       })
       await admin.auth().setCustomUserClaims(uid, { role })

       return res.status(201).send({ uid })
   } catch (err) {
       return handleError(res, err)
   }
}

function handleError(res: Response, err: any) {
   return res.status(500).send({ message: `${err.code} - ${err.message}` });
}


//admin sistemdeki tüm kullanıcıları görmek için kullanır
export async function getAllUsers(req: Request, res: Response) {
    try {
        const listUsers = await admin.auth().listUsers()
        const users = listUsers.users.map(mapUser)
        return res.status(200).send({ users })
    } catch (err) {
        return handleError(res, err)
    }
}

//user objesi, databaseden çekince kullanılır
function mapUser(user: admin.auth.UserRecord) {
    const customClaims = (user.customClaims || { role: '' }) as { role?: string }
    const role = customClaims.role ? customClaims.role : ''
    return {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        role,
        disabled: user.disabled === undefined ? false : user.disabled,
        lastSignInTime: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime
    }
}

//tek kullanıcı
export async function getUser(req: Request, res: Response) {
   try {
       const { id } = req.params
       const user = await admin.auth().getUser(id)
       return res.status(200).send({ user: mapUser(user) })
   } catch (err) {
       return handleError(res, err)
   }
}

//user updatelemek için, herhangi bilgi değiştirirse çağırılır
export async function patchUser(req: Request, res: Response) {
   try {
       const { id } = req.params
       const { displayName, password, disabled, email, role } = req.body

       if (!id || !role ) {
           return res.status(400).send({ message: 'Missing fields' })
       }

       await admin.auth().updateUser(id, { displayName, password, email, disabled })
       await admin.auth().setCustomUserClaims(id, { role })
       const user = await admin.auth().getUser(id)

       return res.status(204).send({ user: mapUser(user) })
   } catch (err) {
       return handleError(res, err)
   }
}


//user sil
export async function removeUser(req: Request, res: Response) {
   try {
       const { id } = req.params
       await admin.auth().deleteUser(id)
       return res.status(204).send({})
   } catch (err) {
       return handleError(res, err)
   }
}

//get multiple users by ids
export async function retrieveUsersByUID(ids: Array<any>) {
    try {
        
        const listUsers = await admin.auth().getUsers(ids)
        const users = listUsers.users.map(mapUser)
        return users;
    } catch (err) {
        return []
    }
 }