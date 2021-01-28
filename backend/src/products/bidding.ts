import * as admin from 'firebase-admin'


//ID: product idsi
export async function addNewBid(id: string, offer:{newBid:number, offerOwner: string, offerDateTime: string}) {
    try {
        const updateOperation = await admin.firestore().collection('products').doc(id).update({ 
         currentPrice: offer.newBid, //ürünün fiyatını güncelle
         currentOwner: offer.offerOwner, //en güncel bidi veren kişiyi ürünün şu anki sahibi yap
         offerHistory: admin.firestore.FieldValue.arrayUnion(offer) //databasedeki offerhistory kolonunda array şeklinde olan veriye şu an verilen offeri ekle
        })
        console.log(updateOperation);
    } catch (err) {
        console.error(err)
    }
}
