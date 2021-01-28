import { Request, Response } from "express";
import * as admin from 'firebase-admin'
import { addNewBid } from "./bidding";
//import {getDBInstance} from '../firebase';

//console.log(admin.firestore())
//const db = admin.app().firestore();

export async function createProduct(req: Request, res: Response) {
   try {
       //kullanıcı satmak istediği productu siteye girer, verileriyle beraber
       const { name, startPrice, images, description, seller, endTime } = req.body

       //databaseye productu ekle
       const { id } = await admin.firestore().collection('products').add({
        name, 
        startPrice, 
        currentPrice: startPrice, 
        images, 
        description, 
        seller,
        currentOwner: seller,
        offerHistory: [],
        state: "ON_AUCTION",
        startTime: admin.firestore.Timestamp.fromDate(new Date()), 
        endTime: admin.firestore.Timestamp.fromDate(new Date(endTime))
       })

       return res.status(201).send({ id })
   } catch (err) {
       return handleError(res, err)
   }
}
 
//amaç tüm productları databaseden çekip ana sayfaya koymak için hazırlamak
 export async function getAllProducts(req: Request, res: Response) {
    try {
        //databasedeki süresi geçmemiş productları listProducts listesine at
        const listProducts = await admin.firestore().collection('products').where("endTime", ">", admin.firestore.Timestamp.fromDate(new Date())).get()
        console.log(new Date().toString()) //Şu anki süreyi konsolya yazdır
        let products = listProducts.docs.map(product=>mapProduct(product)) //listedeki her bir productu objeye çevir

        //products = products.filter(product => new Date(product.endTime) > new Date())
        return res.status(200).send({ products })
    } catch (err) {
        return handleError(res, err)
    }
}



//amaç productu databaseden çekip product sayfasına koymak için hazırlamak
export async function getProduct(req: Request, res: Response) {
   try {
       const { id } = req.params //ekranda ürünün üzerine tıklayınca onun idsi request olarak gelir
       const product = await admin.firestore().collection('products').doc(id).get() //databaseden productlar tablosundan verilen idli şeyi al
       return res.status(200).send(mapProduct(product)) //böyle bi product varsa ona git ve onu objeye çevir, ve response true dön
   } catch (err) {
       return handleError(res, err)
   }
}


/* ************************************* */
/* ************** HELPERS ************** */
/* ************************************* */
function mapProduct(productSnap: any) {    
    const product = productSnap.data();

    return {
        id:productSnap.id,
        ...product,
        startTime: product.startTime.toDate(), 
        endTime: product.endTime.toDate(),
    }
}

function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
 }


//amaç tüm productları databaseden çekip ana sayfaya koymak için hazırlamak
export async function getAllExpiredProducts() {
    try {
        //databasedeki süresi geçmemiş productları listProducts listesine at
        const listProducts = await admin.firestore().collection('products').where("endTime", "<=", admin.firestore.Timestamp.fromDate(new Date())).get()
        console.log(new Date().toString()) //Şu anki süreyi konsolya yazdır
        let products = listProducts.docs.map(product=>mapProduct(product)) //listedeki her bir productu objeye çevir
        products = products.filter(product => product.state !== "COMPLETED")
        return { products }
    } catch (err) {
        console.error(err)
        return {}
    }
}

//amaç tüm productları databaseden çekip ana sayfaya koymak için hazırlamak
export async function getProductsOfSeller(req: Request, res: Response) {
    try {
        const { id } = req.params 
        const listProducts = await admin.firestore().collection('products').where("seller", "==", id).get()
        let products = listProducts.docs.map(product=>mapProduct(product))

        return res.status(200).send({ products })
    } catch (err) {
        return handleError(res, err)
    }
}

export async function updateStateOfProduct(id: string) {
    try {
        //databasedeki süresi geçmemiş productları listProducts listesine at
        await admin.firestore().collection('products').doc(id).update({
            state: "COMPLETED"
        })
    } catch (err) {
        console.error(err)
    }
}

export async function submitBid(req: Request, res: Response) {
    try{
        const { id, offer } = req.body
        addNewBid(id, offer)
    } catch(err){
        console.error(err)
    }
}