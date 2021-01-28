import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as cron from 'node-cron';
import { createUser, getAllUsers, getUser, patchUser, removeUser, retrieveUsersByUID } from "./users/controller";

//import { usersRoutesConfig } from './users/routes-config';
//import { productsRoutesConfig } from './products/routes-config';
import initFirebase from './firebase'
import { createProduct, getAllProducts, getProduct, getAllExpiredProducts, updateStateOfProduct, getProductsOfSeller, submitBid } from './products/controller';
import getTransporter from './nodemailer';

initFirebase();
let transporter = getTransporter();

const app = express();
app.use(bodyParser.json());
app.use(cors());

cron.schedule("*/30 * * * * *", async function() { // running tasks with 1 min periods
  console.log("running scheduled job")
  const expiredProducts = await getAllExpiredProducts();
  expiredProducts.products?.map(async product => {
    if(product.currentOwner !== product.seller){
      await retrieveUsersByUID([{uid:product.currentOwner}, {uid: product.seller}]).then(async users=>{
        console.log(users)
        await (await transporter).sendMail({
          from: '"Auctionly 👻" <info@auctionly.com>',
          to: [users[0].email, users[1].email], // list of receivers
          subject: `Auction of ${product.name} has been completed.✔`, // Subject line
          text: `Auction for the product ${product.name} has been completed. The new owner is ${users[0].displayName}. Final price is ${product.currentPrice}₺.\nHave a great day,\n-Auctionly Admin`, // plain text body
          html: `<p>Auction for the product <b>${product.name}</b> has been completed. The new owner is <b>${users[0].displayName}</b>. Final price is <b>${product.currentPrice}₺</b></p>.\nHave a great day,\n-Auctionly Admin`, // html body
        })
      })
    } else {
      await retrieveUsersByUID([{uid: product.seller}]).then(async users=>{
        await (await transporter).sendMail({
          from: '"Auctionly 👻" <info@auctionly.com>',
          to: users[0].email, // list of receivers
          subject: `Auction of ${product.name} has been completed.❌`,
          text: `Auction for the product ${product.name} has been completed. No one bidded for the item but no worries, you can still update your price and give it a go again.\nHave a great day,\n-Auctionly Admin`, // plain text body
          html: `<p>Auction for the product <b>${product.name}</b> has been completed. No one bidded for the item but no worries, you can still update your price and give it a go again.</p>\nHave a great day,\n -Auctionly Admin`, // html body
        })
      })
    }
    updateStateOfProduct(product.id)
  })
});



app.post('/users',
  //isAuthenticated,
  //isSuperAdmin({}),
  createUser
);
// lists all users
app.get('/users', [
  //isAuthenticated,
  //isSuperAdmin({}),
  getAllUsers
]);
// get :id user
app.get('/users/:id', [
  //isAuthenticated,
  //isSuperAdmin({ allowSameUser: true }),
  getUser
]);
// updates :id user
app.patch('/users/:id', [
  //isAuthenticated,
  //isSuperAdmin({ allowSameUser: true }),
  patchUser
]);
// deletes :id user
app.delete('/users/:id', [
  //isAuthenticated,
  //isSuperAdmin({}),
  removeUser
]);
app.post('/products',
  //isAuthenticated,
  //isSuperAdmin({}),
  createProduct
);
// lists all products
app.get('/products', [
  //isAuthenticated,
  //isSuperAdmin({}),
  getAllProducts
]);
// get :id product
app.get('/products/:id', [
  //isAuthenticated,
  //isSuperAdmin({}),
  getProduct
]);
// get products of :id seller
app.get('/user-products/:id', [
  //isAuthenticated,
  //isSuperAdmin({}),
  getProductsOfSeller
]);
app.post('/submit-bid',
  //isAuthenticated,
  //isSuperAdmin({}),
  submitBid
);

const PORT = process.env.PORT || 4000
app.listen(PORT, function(){
    console.log("Server is running on port", PORT);
 });