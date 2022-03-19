import * as Router from "koa-router"
import * as Koa from "koa"
import { leadRouter } from "./leads/leadInfoRouter"

const apiVersion = "api-v1"

/**
 * This is the main router for the all the API's
 * @param app the main KOA app to which this router will be attached
 */
export function createAPIRouter(app: Koa): void {
    const mainRouter = new Router({
        prefix: `/${apiVersion}`
    })

    mainRouter.use("/", leadRouter.routes())

    mainRouter.all("(.*)", badRequestPath)

    app.use(mainRouter.routes())
    app.use(mainRouter.allowedMethods())

    console.log("***************API Routes Initialised****************")

}

/*
* Displays a status 400 and an error message 'Bad Request Path'
* Using this to block off url paths that are unknown for a specific router prefix
* @param ctx Koa.ParameterizedContext
*/
function badRequestPath(ctx: Koa.ParameterizedContext): void {
    ctx.description = "Bad request path"
    ctx.status = 400 //status code should not always be 400 but for this excercise, i will leave it to 400
    ctx.body = {
        error: "BAD REQUEST PATH"
    }
}

