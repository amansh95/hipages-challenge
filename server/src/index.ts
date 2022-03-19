import * as http from "http"
import * as Koa from "koa"
import { createAPIRouter } from "./api/apiRouter"
import { activateDbConnection } from "./database/databaseQueries"
import { setupMiddleWares } from "./middlewares"


const httpPort = 80
// const httpsPort = 443

/**
 * This function will create the setup needed for the server to function
 * These include things like the middlewares, routers and in productionn, ssl cert files etc
 * @returns the correctly configured application
 */
async function setupServer(): Promise<Koa<Koa.DefaultState, Koa.DefaultContext>> {
    const app = new Koa()
    console.log("Setting up the webserver")
    setupMiddleWares(app)
    createAPIRouter(app)
    return app
}

/**
 * Configure the ports that the app will run on 
 * Ideally it will include a https port as well but I will limit this to an http connection for now
 */
async function createServer(): Promise<void> {
    const app = await setupServer()
    const httpServer = http.createServer(app.callback())
    //activate the db connection 
    activateDbConnection()
    httpServer.listen(httpPort, () => {
        console.log("HTTP Server started on port " + httpPort);
    })
}

//just calling the start function
(async () => {
    try {
        await createServer()
    } catch (err) {
        console.log("Could not start the server. Err message " + err.message);
    }
})()
