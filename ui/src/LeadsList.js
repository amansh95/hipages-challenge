import React from 'react'
import Lead, { endpointPrefix } from './Lead'
import axios from 'axios'
import { uuid } from 'uuidv4';

const LeadsList = ({ invited, accepted }) => {

    const handlReset = async () => {
        await axios.delete(`${endpointPrefix}/leads/all`)
        window.location.reload(false);
    }

    return (
        <div className="float-container">
            <div className="float-child">
                <h1>Invited Leads</h1>
                <div className='item-container'>
                    {invited.map(lead => {
                        return <Lead key={uuid()} lead={lead} invited={true} />
                    })
                    }
                </div>
            </div>
            <div>
                <h1>Accepted Leads</h1>
                <div className='item-container'>
                    {accepted.map(lead => {
                        return <Lead key={uuid()} lead={lead} invited={false} />
                    })
                    }
                </div>
            </div>
            <div className="float-child-2">
                <button className="button-1" onClick={() => handlReset()}>Reset all leads to new</button>
            </div>
        </div>
    );
}

export default LeadsList
