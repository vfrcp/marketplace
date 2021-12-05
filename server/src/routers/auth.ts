import {Router, Request, Response} from "express"
import {Database, Iresponse} from "../models/Database";
import {ErrorHandle} from "../models/Error";
import {Itokens, Tokens} from "../models/Tokens";
export const router: Router = Router()

interface IloginBody{
    username: string,
    password: string,
}
interface IregisterBody{
    username: string,
    email: string,
    password: string,
    personType: "seller" | "buyer",
}

// дженерик Реквеста это: первые 2 не знаю, 3 это req.body
router.post("/login", async (req:Request<{}, {}, IloginBody>, res:Response) => {
    try {
        const body = req.body as IloginBody
        if(body?.username && body?.password){
            const result: Iresponse = await Database.login(body.username, body.password)
            const tokens: Itokens = Tokens.create(result)
            console.log(tokens)
            res.send(result)
        }else{
            res.send({success: "wrong", body: "Don't full body"})
        }
    }catch (err){
        res.send({success: "wrong", body: "Don't full body"})
    }
})
router.post("/register", async (req:Request<{}, {}, IregisterBody>, res:Response) => {
    try {
        const body = req.body as IregisterBody
        if(body?.username && body?.email && body?.password && body?.personType){
            const result: Iresponse = await Database.register(body.username, body.email, body.password, body.personType)
            console.log(result)
            res.send(result)
        }else{
            res.send({success: "wrong", body: "Don't full body"})
        }
    }catch (err) {
        ErrorHandle.create(err, "router register, auth.ts")
    }
})



