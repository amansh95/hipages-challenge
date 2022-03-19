import * as Koa from "koa"
import * as Joi from "joi"
import { getAllAcceptedLeads, getAllInvitedLeads, setLeadStatus, JobsEnum, JobStatus } from "./database/databaseQueries"

/**
 * Shows the list of leads that are marked as invited
 * @param ctx 
 */
export async function getInvitedLeads(ctx: Koa.ParameterizedContext): Promise<void> {
    try {
        ctx.body = {
            invited: await getAllInvitedLeads()
        }
    } catch (err) {
        errorHandler(ctx, err.message)
    }
}

/**
 * Shows the list of leads that are marked as accepted
 * @param ctx 
 */
export async function getAcceptedLeads(ctx: Koa.ParameterizedContext): Promise<void> {
    try {
        //placeholder for getting all the accepted leads
        ctx.body = {
            accepted: await getAllAcceptedLeads()
        }
    } catch (err) {
        errorHandler(ctx, err.message)
    }
}

/**
 * Will mark the specified lead as either accepted or declined
 * @param ctx 
 */
export async function markLeadAccepted(ctx: Koa.ParameterizedContext): Promise<void> {
    try {
        //assuming that job ids are unique, this api will only need the job id to mark that job as completed
        const leadAcceptedParams = Joi.object({
            id: Joi.number().required()
        })
        const leadAcceptedBody = Joi.object({
            status: Joi.string().valid(JobsEnum.accepted, JobsEnum.declined).required()
        })
        //validate the request 
        const queryParams: { id: number } = await leadAcceptedParams.validateAsync(ctx.request.query)
        const requestBody: { status: JobStatus } = await leadAcceptedBody.validateAsync(ctx.request.body)
        ctx.body = {
            status: await setLeadStatus(queryParams.id, requestBody.status)
        }
    } catch (err) {
        errorHandler(ctx, err.message)
    }
}


/**
 * Generate a generic error message if something goes wrong
 * @param ctx 
 * @param message 
 */
function errorHandler(ctx: Koa.ParameterizedContext, message: string): void {
    ctx.status = 404 //ideally this would depend on the kind of error
    ctx.body = {
        error: message
    }
}