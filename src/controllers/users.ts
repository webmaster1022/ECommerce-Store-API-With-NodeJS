import express,{Request,Response} from "express";
import { User,userStore } from "../models/user";

const store = new userStore();

const index = async (_req:Request,res:Response)=>{
    const users = await store.index();
    res.json(users)
}

const show = async(req:Request,res:Response)=>{
    const user = await store.show(req.body.id);
    res.json(user)
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username:req.body.username,
            password:req.body.password,
        }
            



        const newUser = await store.create(user)
        res.json(newUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const signin = async (req: Request, res: Response) => {
    const user = await store.authenticate(req.body.username,req.body.password)
    res.json(user)
}

const users_routes=(app: express.Application) =>{
    app.get('/users',index)
    app.post('/users',create)
    app.post('/users/authenticate',signin)
    app.get('/users/:id',show)
    app.delete('/users/:id',destroy)
}

export default users_routes

/*
index => GET /products
show => GET /products/:id
create => POST /products
edit => PUT/PATCH /products/:id
delete => DELETE /products/:id

 */