import express, {Application} from "express"
import {router as authRouter} from "./routers/auth"
import {config} from "./config"
import {connect} from "mongoose"
import {ErrorHandle} from "./models/Error";
import {auth as authMiddleware} from "./middlewares/auth";
import * as fs from "fs";

const App:Application = express()

App.use(express.json())

App.use(authMiddleware)
App.use("/auth", authRouter)

const PORT: number = config.Port || 5000

const start = async (): Promise<void> => {
    try{
        await connect(config.dbData.dbLink)
        await App.listen(PORT, () => {
            console.log(`App has been started in ${PORT}`)
            fs.writeFile("./logs.txt", "", () => {
                console.log("logs cleaned")
            })
        })
    }catch(err: unknown){
        ErrorHandle.create(err, "start func, App.ts")
    }
}
start().finally()