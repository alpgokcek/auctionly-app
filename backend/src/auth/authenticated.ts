import { Request, Response } from "express";
import * as admin from 'firebase-admin'


//middleware
export async function isAuthenticated(req: Request, res: Response, next: Function) {
   const { authorization } = req.headers
    
   if (!authorization)
       return res.status(401).send({ message: 'Unauthorized' });

   if (!authorization.startsWith('Bearer'))
       return res.status(401).send({ message: 'Unauthorized' });

   const split = authorization.split('Bearer ')
   //token var mı diye kontrol et
   if (split.length !== 2)
       return res.status(401).send({ message: 'Unauthorized' });

   const token = split[1]

   try {
       //token doğruysa admin konsolundan kontrol ediyo
       const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
       //token sahibinin bilgilerini response şeklinde döndürüyor
       res.locals = { ...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email }
       return next(); //middlewareye gidip token kısmını sorup doğru endpointe göndermek için sonraki middlewareye gider.
   }
   catch (err) {
       console.error(`${err.code} -  ${err.message}`)
       return res.status(401).send({ message: 'Unauthorized' });
   }
}