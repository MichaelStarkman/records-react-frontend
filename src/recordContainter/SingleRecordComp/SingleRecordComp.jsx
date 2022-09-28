import React from 'react'

const SingleRecordComp = (props) => {
  return (
    <div className='index-single-record'>
        <h2>Artist: {props.record.artist}</h2>
        <div className='index-single-record-details'>
            <h3>Album: {props.record.album}</h3>
            <h3>Released: {props.record.release_date}</h3>
        </div>
    </div>
  )
}

export default SingleRecordComp