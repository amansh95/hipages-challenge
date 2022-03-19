import koaBody = require("koa-body")
import * as Router from "koa-router"
import * as Koa from "koa"
import { getAcceptedLeads, getInvitedLeads, changeLeadStatus, resetAllLeads } from "./leadHandler"


export const leadRouter = new Router({
    prefix: "leads/"
})

leadRouter.get("invited", getInvitedLeads)

leadRouter.get("accepted", getAcceptedLeads)

leadRouter.put("accepted", changeLeadStatus)

//this is a test API and should be disregarded
leadRouter.delete("all", resetAllLeads)
