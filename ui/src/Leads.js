import React, { useEffect, useState } from 'react'
import axios from 'axios'

const LeadsApp = () => {
    const [leadInfo, setLeadInfo] = useState([])
    useEffect(() => {
        fetchLeads()
    }, [])
    const fetchLeads = () => {
        axios.get('http://localhost/api-v1/leads/invited')
            .then((res) => {
                console.log(res);
                setLeadInfo(res.data.invited)
            }).catch((err) => {
                console.log(err);
            })
    }

    const [acceptedLead, setAccepted] = useState([])
    useEffect(() => {
        fetchAccepted()
    }, [])
    const fetchAccepted = () => {
        axios.get('http://localhost/api-v1/leads/accepted')
            .then((res) => {
                console.log(res);
                setAccepted(res.data.accepted)
            }).catch((err) => {
                console.log(err);
            })
    }

    async function handleClick(id, status) {
        await axios.put(`http://localhost/api-v1/leads/accepted?id=${id}`, {
            status: status
        })
        window.location.reload(false);
    }

    //this is a test api, disregard it
    async function handlReset() {
        await axios.delete(`http://localhost/api-v1/leads/all`)
        window.location.reload(false);
    }

    //my UI skills are a bt rusty, bear with me
    return (
        <div className="float-container">
            <div className="float-child">
                <h1>Invited Leads</h1>
                <div className='item-container'>
                    {leadInfo.map((lead) => (
                        <div className='card'>
                            <h3>{lead.contact_name} &emsp; &emsp; &emsp; {lead.contact_email}</h3>
                            <hr size="2" width="100%" color="grey" />
                            <h4><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg> {lead.suburbName}, {lead.postcode} &emsp; &emsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-briefcase" viewBox="0 0 16 16">
                                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z" />
                                </svg>  {lead.categoryName}
                                &emsp; &emsp; Job ID: {lead.id}  &emsp; &emsp; ${lead.price} Lead Invitation
                            </h4>
                            <hr size="2" width="100%" color="grey" />
                            <p>{lead.description}</p>
                            <p>
                                <button className="button-1" onClick={() => handleClick(lead.id, "accepted")}>Accept</button>
                                &emsp; &emsp;
                                <button className="button-1" onClick={() => handleClick(lead.id, "declined")}>Decline</button>


                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h1>Accepted Leads</h1>
                <div className='item-container'>
                    {acceptedLead.map((lead) => (
                        <div className='card'>
                            <h3>{lead.contact_name} &emsp; &emsp; &emsp; {lead.contact_email}</h3>
                            <hr size="2" width="100%" color="grey" />
                            <h4><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg> {lead.suburbName}, {lead.postcode} &emsp; &emsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-briefcase" viewBox="0 0 16 16">
                                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z" />
                                </svg>  {lead.categoryName}
                                &emsp; &emsp; Job ID: {lead.id}  &emsp; &emsp; ${lead.price} Lead Invitation
                            </h4>
                            <hr size="2" width="100%" color="grey" />
                            <p>{lead.description}</p>
                            <p>
                                <button className="button-1" onClick={() => handleClick(lead.id, "declined")}>Decline</button>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="float-child-2">
            <button className="button-1" onClick={() => handlReset()}>Reset all leads to new</button>
            </div>
        </div>

    );
}

export default LeadsApp