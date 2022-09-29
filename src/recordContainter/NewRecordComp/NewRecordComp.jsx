import React from 'react'
import { useState } from 'react';



const NewRecordComp = (props) => {
    const [showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [isValidState, setIsValidState] = useState({valid: true, message: ""})
    const [newRecord, setNewRecord] = useState({
        artist: "",
        album: "",
        release_date: 0
    })
    const handleInputChange = (e) => {
        setNewRecord({
            ...newRecord,
            [e.target.name]: e.target.value
        })
    }
    const submitNewRecord = (e)=>{
        e.preventDefault()
        let validSubmission = true
        if(newRecord.artist.length < 2){
            setIsValidState({
                valid: false,
                message: "Name needs to be longer"
            })
            validSubmission = false
        }
        if(validSubmission){
            props.createNewRecord(newRecord)
            setNewRecord({
                artist: "",
                album: "",
                release_date: 0
            })
            setIsValidState({
                valid: true,
                message: ""
            })
            setShowing(false)
        }
    }
    return (
        <>
            {
                showing ?
                <div className='new-record-form'>
                    <button onClick={toggleShowing}>X</button>
                    <form onSubmit={submitNewRecord}>
                        {isValidState.valid ? null : <p className='form-err'>{isValidState.message}</p> }
                        {props.newRecordServerError ? <p className='form-err'>{props.newRecordServerError}</p> : null}
                        Artist: <input required onChange={handleInputChange} type="text" name="artist" value={newRecord.artist}/>
                        Album: <input onChange={handleInputChange} type="text"  name='album' value={newRecord.album}/>
                        Released: <input onChange={handleInputChange} type="number" name='release_date' value={newRecord.release_date}/>
                        <br></br>
                            <button type='submit'>Create New Record</button>
                    </form>
                </div>
                :
                <button onClick={toggleShowing}>Create New Record</button>
            }
            
        </>
  )
}

export default NewRecordComp