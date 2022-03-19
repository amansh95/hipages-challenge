import * as mysql from "mysql"

const jobsTable = "jobs"
const suburbsTable = "suburbs"
const categoriesTable = "categories"


let dbPool: mysql.Pool
export function activateDbConnection(): void {
    try {
        dbPool = mysql.createPool({
            connectionLimit: 100,
            host: 'host.docker.internal',
            user: 'root',
            password: 'hipages', //obviously  the password wont be plaintext and will be fetched from outside the source code
            database: 'hipages',
            debug: false
        })

    } catch (err) {
        console.log("Could not connect to the database")
    }
}

/**
 * List all invited leads
 * @returns 
 */
export async function getAllInvitedLeads(): Promise<JobDetails[]> {
    const getInvitedQuery = `select * from jobs where status = ${dbPool.escape(JobsEnum.new)}`
    return new Promise((resolve, reject) => {
        dbPool.query(getInvitedQuery, (err, results: JobDetails[]) => {
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
    const getInvitedQuery = `select * from ${jobsTable} where status = ${dbPool.escape(JobsEnum.accepted)}`
    return new Promise((resolve, reject) => {
        dbPool.query(getInvitedQuery, (err, results: JobDetails[]) => {
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
    const setAcceptedQuery = `UPDATE ${jobsTable} SET status =  ${dbPool.escape(status)} where id = ${dbPool.escape(id)}`
    return new Promise((resolve, reject) => {
        dbPool.query(setAcceptedQuery, (err, results) => {
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
    const getSuburbNameQuery = `select name, postcode from ${suburbsTable} where id = ${dbPool.escape(suburbId)}`
    const getCategoryNameQuery = `select name from ${categoriesTable} where id = ${dbPool.escape(categoryId)}`
    const details: ExtraInfo = {
        suburbName: "",
        postcode: 0,
        categoryName: ""
    }
    //TODO: proper error handling here, i will assume all the data is valid
    //can be implemented better but this should be fine for now
    //ideally it wont have to cascade like this 
    return new Promise((resolve, reject) => {
        dbPool.query(getSuburbNameQuery, (err, results) => {
            if (err) reject(err)
            details.suburbName = results[0].name
            details.postcode = results[0].postcode
            dbPool.query(getCategoryNameQuery, (err2, results2) => {
                if (err2) reject(err2)
                details.categoryName = results2[0].name
                resolve(details)
            })
        })
    })
}

export async function setAllLeadsToNew(): Promise<void> {
    const resetQuery = `UPDATE ${jobsTable} SET status =  ${dbPool.escape("new")} where id > ${dbPool.escape(0)}`
    return new Promise((resolve, reject) => {
        dbPool.query(resetQuery, (err, results) => {
            if (err) reject(err)
            resolve()
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