import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export function middleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers.authorization;

    try{
        const decode = jwt.verify(token as string, JWT_SECRET);
        if(decode){
            if(typeof decode === "string"){
                res.json({
                    message: "token decoded as string"
                })
                return;
            }
            req.userId = (decode as JwtPayload).id;
            next();
        }else{
            res.json({
                message: "You are not logged in"
            })
        }
    }catch(e:any){
        if(e.name ==="TokenExpiredError"){
            res.json({
                message: "Session expired. Login again"
            })
        }else{
            res.json({
                message: "jwt verification error"
            })
        }
    }
}