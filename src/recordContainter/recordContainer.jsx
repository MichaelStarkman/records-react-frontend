import { useState, useEffect } from 'react';
import React from 'react'

import SingleRecordComp from './SingleRecordComp/SingleRecordComp';
import NewRecordComp from './NewRecordComp/NewRecordComp';

const RecordContainer = () => {
    const [requestError, setRequestError] = useState("")
    const [records, setRecords] = useState([]);
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
            setRecords([parsedResponse.data, ...records])
        } else {
            // Show error message in the form
            setNewRecordServerError(parsedResponse.data)
            // TODO: refactor state from newRecordForm to here since the containter is the only place that knows whether form was successful 
        }
    }
    const deleteRecord = async (idToDelete) => {
        try {
            const apiResponse = fetch(`http://localhost:3001/records/${idToDelete}`, {
            method: "DELETE",
            })
            const parsedResponse = await (await apiResponse).json()
            if(parsedResponse.success){
                // const newRecords = [];
                // for (let i = 0; i < records.length; i++){
                //     if(records[i]._id !== idToDelete){
                //         newRecords.push(records[i])
                //     }
                // }
                const newRecords = records.filter(record => record._id !== idToDelete)
                setRecords(newRecords)
            } else {
                // TODO: handle unsuccessful delete 
            }
        } catch(err) {
            console.log(err)
            setRequestError(err.message)
            // TODO: handle front end error, TBD 
        }
        console.log("deleting record id" + idToDelete)
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
    const updateRecord = async (idToUpdate, recordToUpdate) => {
        // const newRecords = [];
        // for(let i=0; i< records.length; i++){
        //     if(records[i]._id === idToUpdate){
        //         newRecords.push(recordToUpdate)
        //     } else {
        //         newRecords.push(records[i]);
        //     }
        // }
        const apiResponse = await fetch(`http://localhost:3001/records/${idToUpdate}`, {
            method: "PUT",
            body: JSON.stringify(recordToUpdate),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json();
        if(parsedResponse.success){
            const newRecords = records.map(record => record._id === idToUpdate ? recordToUpdate : record)
            setRecords(newRecords)
        } else {
            setRequestError(parsedResponse.data)
        }
    }
    useEffect(()=>{
        getRecords()
     }, [])
    return (
        <div>
            { requestError.length ? <p>{requestError}</p> : null}
            <h1>Record Collection goes HERE</h1>
            <NewRecordComp
            
                newRecordServerError={newRecordServerError}
                createNewRecord={createNewRecord}
            ></NewRecordComp>
            {records.reverse().map((record)=>{
                return <SingleRecordComp 
                            key={record._id} 
                            record={record}
                            deleteRecord={deleteRecord}
                            updateRecord={updateRecord}
                        ></SingleRecordComp>
            })}
        </div>
    )
}

export default RecordContainer;