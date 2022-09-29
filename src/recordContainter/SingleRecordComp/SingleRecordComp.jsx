import React from 'react'
import { useState } from 'react';


const SingleRecordComp = (props) => {
  const [isValidState, setIsValidState] = useState({valid: true, message: ""})
  const [showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [updateRecord, setUpdateRecord] = useState({
      artist: props.record.artist,
      album: props.record.album,
      release_date: props.record.release_date,
      _id: props.record._id
  })
  const handleInputChange = (e) => {
      setUpdateRecord({
          ...updateRecord,
          [e.target.name]: e.target.value
      })
  }
  const submitUpdateRecord = (e) => {
    e.preventDefault();
    props.updateRecord(props.record._id, updateRecord)
    setShowing(false)
  }
  return (
    <div className='index-single-record'>
        <h2>Artist: {props.record.artist}</h2>
        <div className='index-single-record-details'>
            <h3>Album: {props.record.album}</h3>
            <h3>Released: {props.record.release_date}</h3>
        </div>
        <button onClick={()=>{
          props.deleteRecord(props.record._id)
        }}>Delete Record
        </button>
        <br></br>
        {
          showing ?
          
          <div id='edit-record-form'>
            <button onClick={toggleShowing}>X</button>
                    <form onSubmit={submitUpdateRecord}>
                        {isValidState.valid ? null : <p className='form-err'>{isValidState.message}</p> }
                        Artist: <input required onChange={handleInputChange} type="text" name="artist" value={updateRecord.artist}/>
                        Album: <input onChange={handleInputChange} type="text"  name='album' value={updateRecord.album}/>
                        Released: <input onChange={handleInputChange} type="number" name='release_date' value={updateRecord.release_date}/>
                        <br></br>
                            <button type='submit'>Update Record</button>
                    </form>
          </div>
          :
          <button onClick={toggleShowing}>Update Record</button>
        }
        <>
        </>
        
    </div>
  )
}

export default SingleRecordComp