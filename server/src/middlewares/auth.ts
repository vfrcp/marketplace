import {Request, Response, NextFunction} from "express"
import {ItokensData, Tokens} from "../models/Tokens";
import {config} from "../config";

export const auth = (req: Request, res: Response, next: NextFunction): void => {
    try {
        if(req.headers.authorization && req.cookies[config.tokens.nameTokenR]){
            const tokens: ItokensData = Tokens.verifyAndDecode(req.headers.authorization, req.cookies[config.tokens.nameTokenR])
            if(
                tokens.tokenR && tokens.tokenA && typeof tokens.tokenA === "object"
                && typeof tokens.tokenR === "object" && tokens.tokenA.username === tokens.tokenR.username
                && tokens.tokenA.id === tokens.tokenR.id
            ){

            }
        }else{
            throw Error("Don't have tokens")
        }
    }catch (err: unknown){
    }finally {
        next()
    }
}