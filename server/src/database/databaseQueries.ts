import * as mysql from "mysql"

const jobsTable = "jobs"
const suburbsTable = "suburbs"
const categoriesTable = "categories"


let dbConnection: mysql.Connection
export function activateDbConnection(): void {
    dbConnection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'hipages', //obviously  the password wont be plaintext and will be fetched from outside the source code
        database: 'hipages'
    })
    dbConnection.connect()
}

/**
 * List all invited leads
 * @returns 
 */
export async function getAllInvitedLeads(): Promise<JobDetails[]> {
    const getInvitedQuery = `select * from jobs where status = ${dbConnection.escape(JobsEnum.new)}`
    return new Promise((resolve, reject) => {
        dbConnection.query(getInvitedQuery, (err, results: JobDetails[]) => {
            if (err) reject(err)
            getAllInfo(results).then((updatedResults) => {
                resolve(updatedResults)
            }).catch((err) => reject(err))
        });
    })
}

/**
 * List all accepted leads
 * @returns 
 */
export async function getAllAcceptedLeads(): Promise<JobDetails[]> {
    const getInvitedQuery = `select * from ${jobsTable} where status = ${dbConnection.escape(JobsEnum.accepted)}`
    return new Promise((resolve, reject) => {
        dbConnection.query(getInvitedQuery, (err, results: JobDetails[]) => {
            if (err) reject(err)
            getAllInfo(results).then((updatedResults) => {
                resolve(updatedResults)
            }).catch((err) => reject(err))
        });
    })
}

/**
 * Set lead as either accepted or declined
 * @returns 
 */
export async function setLeadStatus(id: number, status: JobStatus): Promise<string> {
    const setAcceptedQuery = `UPDATE ${jobsTable} SET status =  ${dbConnection.escape(status)} where id = ${dbConnection.escape(id)}`
    return new Promise((resolve, reject) => {
        dbConnection.query(setAcceptedQuery, (err, results) => {
            if (err) {
                console.log(err);
                reject(new Error("Invalid Job ID")) //assuming the only reason this fails is that the job id doesnt exist
            }
            if (!results.affectedRows) reject(new Error("Invalid Job ID"))
            if (!results.changedRows) reject(new Error(`Lead already ${status}`))
            resolve(`Lead ${status}`)
        });
    })
}


export async function getExtraDetails(suburbId: number, categoryId: number): Promise<ExtraInfo> {
    const getSuburbNameQuery = `select name, postcode from ${suburbsTable} where id = ${dbConnection.escape(suburbId)}`
    const getCategoryNameQuery = `select name from ${categoriesTable} where id = ${dbConnection.escape(categoryId)}`
    const details: ExtraInfo = {
        suburbName: "",
        postcode: 0,
        categoryName: ""
    }
    //TODO: proper error handling here, i will assume all the data is valid
    //can be implemented better but this should be fine for now
    //ideally it wont have to cascade like this 
    return new Promise((resolve, reject) => {
        dbConnection.query(getSuburbNameQuery, (err, results) => {
            if (err) reject(err)
            console.log("+++++++++++++++++++++++++");
            details.suburbName = results[0].name
            details.postcode = results[0].postcode
            dbConnection.query(getCategoryNameQuery, (err2, results2) => {
                if (err2) reject(err2)
                details.categoryName = results2[0].name
                resolve(details)
            })
        })
    })
}

async function getAllInfo(leadList: JobDetails[]): Promise<JobDetails[]> {
    for (const lead of leadList) {
        const info = await getExtraDetails(lead.suburb_id, lead.category_id)
        lead.suburbName = info.suburbName
        lead.postcode = info.postcode
        lead.categoryName = info.categoryName
    }
    return leadList
}



export interface JobDetails {
    id: number
    status: JobStatus
    suburb_id: number
    category_id: number
    contact_name: string
    contact_phone: string
    contact_email: string
    price: number
    description: string
    created_at: string
    updated_at: string
    postcode?: number
    suburbName?: string
    categoryName?: string

}

export interface ExtraInfo {
    suburbName: string
    postcode: number
    categoryName: string
}

export type JobStatus = typeof JobsEnum

export const JobsEnum = {
    new: "new",
    accepted: "accepted",
    declined: "declined"
}