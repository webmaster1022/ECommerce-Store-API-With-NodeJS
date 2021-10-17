import express,{Request,Response,NextFunction} from "express";
import { Product,productStore } from "../models/product";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new productStore();

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
    const products = await store.index();
    res.json(products)
}

const show = async(req:Request,res:Response)=>{
    const product = await store.show(req.body.id);
    res.json(product)
}

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            cathegory:req.body.cathegory

        }
        
            
        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(401)
        res.json(`Invalid token ${err}`)
        return
    }
}

const remove = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const products_routes=(app: express.Application) =>{
    app.get('/products',index)
    app.post('/products',verifyAuthToken,create)
    app.get('/products/:id',show)
    app.delete('/products/:id',remove)
}

export default products_routes

/*
index => GET /products
show => GET /products/:id
create => POST /products
edit => PUT/PATCH /products/:id
delete => DELETE /products/:id

 */