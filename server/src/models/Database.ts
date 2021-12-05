import {Schema, model, Model, ObjectId} from "mongoose"
import {ErrorHandle} from "./Error";

type orders = {
    seller: string,
    buyer: string,
    date: Date,
    status: string,
    price: string
}
type body = {
    id: ObjectId,
    username: string,
}


export interface Iuser{
    username: string,
    email: string,
    password: string,
    personType: "seller" | "buyer",
    orders: Array<orders> | undefined,
}
export interface Iresponse {
    status: "success" | "wrong",
    text?: string,
    body?: body
}

const schema: Schema = new Schema<Iuser>({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    personType: {type: String, required: true},
    orders: {type: Array, required:true, default: []}
}, {versionKey: false})
const UserModel: Model<Iuser> = model<Iuser>("Users", schema)

export class Database {
    static async register(username: string, email: string, password: string, personType: "buyer" | "seller"): Promise<Iresponse>{
        try{
            const candidate = await UserModel.findOne({username, email})
            if(candidate){
                return {status: "wrong", text: "User already exist"}
            }else{
                await UserModel.create({username, email, password, personType})
                return {status: "success", text: "User created"}
            }
        }catch (err: unknown){
            ErrorHandle.create(err, "method register, Database.ts")
            return {status: "wrong", text: "Unexpected error"}
        }
    }
    static async login(username: string, password: string): Promise<Iresponse>{
        try {
            const candidate = await UserModel.findOne({username})
            switch (true){
                case (candidate === null):
                    return {status: "wrong", text: "User with this username does not exist"}
                break
                case (candidate?.username === username && candidate?.password !== password):
                    return {status: "wrong", text: "Wrong password"}
                break
                case (candidate?.username === username && candidate?.password === password):
                    return  {status: "success", body: {username, id: candidate?._id}}
                break
                default: return {status:"wrong", text: "Something gone wrong"}
            }
        }catch (err){
            ErrorHandle.create(err, "method register, Database.ts")
            return {status:"wrong", text: "Something gone wrong"}
        }
    }
}
