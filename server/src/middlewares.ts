import * as Koa from "koa"
import * as body from "koa-body"
import * as JSON from "koa-json"
import * as cors from "koa2-cors"




export function setupMiddleWares(app: Koa): void {
    app.use(body({
        multipart: true,
        jsonLimit: "50mb",
        textLimit: "50mb",
        parsedMethods: ["POST", "PUT", "PATCH", "GET"],
    }))
    app.use(JSON())
    app.use(cors({ origin: "*" }))

    //trust proxies
    app.proxy = true
}