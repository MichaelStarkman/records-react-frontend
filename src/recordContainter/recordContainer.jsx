import { useState, useEffect } from 'react';
import React from 'react'

import SingleRecordComp from './SingleRecordComp/SingleRecordComp';
import NewRecordComp from './NewRecordComp/NewRecordComp';

const RecordContainer = () => {
    const [records, setRecords] = useState([{"_id": "1", "artist": "Freddie Gibbs", "album": "SSS", "release_date": "2022"}]);
    const [newRecordServerError, setNewRecordServerError] = useState("")
    const createNewRecord = async (newRecord) => {
        console.log(newRecord);
        console.log("Let's create this")
        const apiResponse = await fetch("http://localhost:3001/records", {
            method: "POST",
            body: JSON.stringify(newRecord),
            headers:{
                "Content-Type": "application/json"
            }
        })
        // Send request to backend
        const parsedResponse = await apiResponse.json()
        // Parse response from the back end
        console.log(parsedResponse)
        if(parsedResponse.success){
            // add the new record to state!
            setRecords([newRecord, ...records])
        } else {
            // Show error message in the form
            setNewRecordServerError(parsedResponse.data)
            // TODO: refactor state from newRecordForm to here since the containter is the only place that knows whether form was successful 
        }
    }
    const getRecords = async () => {
        try{
            const records = await fetch("http://localhost:3001/records")
            const parsedRecords = await records.json();
            setRecords(parsedRecords.data)
        } catch(err) {
            console.log(err)
            // TODO
        }
    }
    useEffect(()=>{
        getRecords()
     }, [])
    return (
        <div>
            <h1>Record Collection goes HERE</h1>
            <NewRecordComp
            
                newRecordServerError={newRecordServerError}
                createNewRecord={createNewRecord}
            ></NewRecordComp>
            {records.reverse().map((record)=>{
                return <SingleRecordComp 
                            key={record._id} 
                            record={record}
                        ></SingleRecordComp>
            })}
        </div>
    )
}

export default RecordContainer;