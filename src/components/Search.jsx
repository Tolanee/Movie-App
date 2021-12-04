import React from 'react'

const Search = (props) => {
  return (
    <div className='col col-sm-3'>
      <input type="search" className='form-control' value={props.value}
      onChange={(e)=>{
        props.setSearch(e.target.value)
      }} placeholder='Search Movie'/>
    </div>
  )
}

export default Search
