import React, { Component, useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import LeadsList from './LeadsList';
import { endpointPrefix } from "./Lead"

function App() {

  const [invited, setInvited] = useState([])
  const [accepted, setAccepted] = useState([])

  useEffect(() => {
    fetchInvited()
  }, [])

  const fetchInvited = () => {
    axios.get(`${endpointPrefix}/leads/invited`)
      .then((res) => {
        setInvited(res.data.invited)
      }).catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    fetchAccepted()
  }, [])

  const fetchAccepted = () => {
    axios.get(`${endpointPrefix}/leads/accepted`)
      .then((res) => {
        setAccepted(res.data.accepted)
      }).catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="App">
      <LeadsList invited={invited} accepted={accepted} />
    </div>
  );
}

export default App;