import * as fs from "fs";
import ErrnoException = NodeJS.ErrnoException;

interface Ierror{
    name: string,
    message: string,
    place: string,
    time: Date,
}

export class ErrorHandle{
    static create(err: unknown, place: string): Ierror{
        const error = err as Ierror
        const {name, message} = error
        const errorData: Ierror = {
            name,
            message,
            place,
            time: new Date(),
        }
        fs.appendFile("./logs.txt", JSON.stringify(errorData), (err:ErrnoException | null) => {
            if(err){
                console.log("Failed to write to logs")
            }else{
                console.log("Error wrote in logs")
            }
        })
        return error
    }
}