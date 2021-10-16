import express,{Request,Response} from "express";
import { Product,productStore } from "../models/product";

const store = new productStore();

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
        res.status(400)
        res.json(err)
    }
}

const remove = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const products_routes=(app: express.Application) =>{
    app.get('/products',index)
    app.post('/products',create)
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