import express,{Request,Response,NextFunction} from "express";
import { Order,orderStore } from "../models/order";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const store = new orderStore();

const verifyAuthToken = (req: Request, res: Response, next:NextFunction) => {
    try {
        const authorizationHeader = (req.headers.authorization) as string
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, (process.env.TOKEN_SECRET) as string)

        next()
    } catch (error) {
        res.status(401)
        res.json(`Access denied,Invalid token. Error: ${error}`)
    }
}

const index = async (_req:Request,res:Response)=>{
    const orders = await store.index();
    res.json(orders)
}

const show = async(req:Request,res:Response)=>{
    const order = await store.show(req.body.id);
    res.json(order)
}

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            
            status:req.body.status,
            user_id:req.body.user_id,

        }

        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const remove = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const addProduct = async(req:Request,res:Response) =>{
    const added = await store.addProduct(parseInt(req.body.quantity),req.params.id,req.body.product_id);
    res.json(added);
}

const orderProperty = async(req:Request, res:Response)=>{
    const owned = await store.orderProperty(parseInt(req.params.id));
    res.json(owned);
}

const orders_routes=(app: express.Application) =>{
    app.get('/orders',index)
    app.post('/orders',create)
    app.get('/orders/:id',show)
    app.delete('/orders/:id',remove)
    app.post('/orders/:id/products',addProduct)
    app.get('/orders/:id/users',verifyAuthToken,orderProperty)
}
export default orders_routes

/*
index => GET /products
show => GET /products/:id
create => POST /products
edit => PUT/PATCH /products/:id
delete => DELETE /products/:id

 */