import React from 'react'

const Filter = ({ filter, change }) => {
    return (
        <div>
            filter shown with:
            <input id={filter}
                   type="text"
                   value={filter}
                   onChange={change}/>
        </div>
    )
}

export default Filter