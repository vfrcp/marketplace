import * as jwt from "jsonwebtoken"
import {config} from "../config";
import {JwtPayload} from "jsonwebtoken";
import {ObjectId} from "mongoose";

type tokenData = {
    username: string,
    id: ObjectId
}

export interface ItokensData {
    tokenA: null | string | JwtPayload | tokenData

    tokenR: null | string | JwtPayload | tokenData
}

export interface Itokens {
    tokenA: string | null,
    tokenR: string | null,
}

export class Tokens {
    static create(data: object): Itokens{
        const tokens: Itokens = {
            tokenA: null,
            tokenR: null,
        }
        tokens.tokenA = jwt.sign(data, config.tokens.secretA, {expiresIn: "1h"})
        tokens.tokenR = jwt.sign(data, config.tokens.nameTokenR, {expiresIn: "30d"})
        return tokens
    }
    static verifyAndDecode(tokenA? : string, tokenR?: string): ItokensData{
        const tokens: ItokensData = {
            tokenA: null,
            tokenR: null,
        }
        if(tokenA){
            try{
                tokens.tokenA = jwt.verify(tokenA, config.tokens.secretA)
            }catch{}
        }
        if(tokenR){
            try{
                tokens.tokenA = jwt.verify(tokenR, config.tokens.secretR)
            }catch{}
        }
        return tokens
    }
}